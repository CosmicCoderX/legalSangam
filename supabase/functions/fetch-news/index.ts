import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.11.0"
import { corsHeaders } from "../_shared/cors.ts"

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Missing Authorization header')
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) throw new Error('Unauthorized')

    // 1. Check News Cache
    // If we have news fetched in the last 30 minutes, return it.
    const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()
    
    const { data: cachedNews, error: cacheError } = await supabase
      .from('news_cache')
      .select('*')
      .gt('fetched_at', thirtyMinsAgo)
      .order('published_at', { ascending: false })
      .limit(20)
      
    if (!cacheError && cachedNews && cachedNews.length > 0) {
      return new Response(JSON.stringify({ articles: cachedNews }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // 2. Fetch fresh news from NewsData.io
    const NEWS_DATA_API_KEY = Deno.env.get('NEWS_DATA_API_KEY')
    if (!NEWS_DATA_API_KEY) throw new Error('NewsData API key not configured')

    const url = `https://newsdata.io/api/1/latest?apikey=${NEWS_DATA_API_KEY}&country=in&language=en,hi&category=breaking,crime,domestic,other,politics`
    
    const res = await fetch(url)
    const data = await res.json()
    
    if (!res.ok) {
      if (res.status === 429) {
        throw new Error("We're temporarily unable to load the latest news right now. Please try again later.")
      }
      throw new Error(data?.results?.message || 'Failed to fetch news from provider')
    }

    const articles = data.results || []
    
    // Classify into custom categories
    const classify = (text: string) => {
      const lower = text.toLowerCase()
      if (/supreme court|high court|judge|judiciary|judgment|verdict|hearing|petition/.test(lower)) return 'Courts & Judiciary'
      if (/law|legal|legislation|bill|act|ordinance|regulation/.test(lower)) return 'Legal'
      if (/crime|police|arrest|fir|fraud|cybercrime|murder|investigation/.test(lower)) return 'Crime'
      if (/politics|parliament|minister|election|political party/.test(lower)) return 'Politics'
      if (/ministry|government|cabinet|policy|official|scheme/.test(lower)) return 'Government'
      return 'Current Affairs'
    }

    // Prepare for bulk insert/upsert
    const records = articles.map((a: any) => ({
      category: classify(a.title + ' ' + (a.description || '')),
      title: a.title,
      description: a.description || a.content || 'No description available.',
      image_url: a.image_url,
      source_name: a.source_id || 'News',
      source_url: a.link,
      published_at: a.pubDate,
      fetched_at: new Date().toISOString()
    }))

    // Upsert into cache
    if (records.length > 0) {
      await supabase.from('news_cache').upsert(records, { onConflict: 'source_url', ignoreDuplicates: true })
    }

    // Return the newly fetched (and classified) records
    return new Response(JSON.stringify({ articles: records }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    const msg = (error as Error).message
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
