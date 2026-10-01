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

    const { documentId } = await req.json()
    if (!documentId) throw new Error('Missing documentId')

    // Get document metadata to check ownership and existing summary
    const { data: doc, error: docError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .eq('owner_id', user.id)
      .single()

    if (docError || !doc) throw new Error('Document not found or access denied')

    // 1. Caching: If already completed, return it immediately
    if (doc.summary_status === 'completed' && doc.summary_content) {
      return new Response(JSON.stringify({ 
        status: 'completed', 
        summary: doc.summary_content 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // Set status to processing
    await supabase.from('documents').update({ summary_status: 'processing' }).eq('id', documentId)

    // 2. Fetch PDF from Storage
    const { data: fileData, error: fileError } = await supabase.storage.from('documents').download(doc.storage_path)
    if (fileError || !fileData) {
      await supabase.from('documents').update({ summary_status: 'failed' }).eq('id', documentId)
      throw new Error('Failed to download document')
    }

    // Convert file blob to base64
    const arrayBuffer = await fileData.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    const chunkSize = 8192;
    let base64String = "";
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
        base64String += String.fromCharCode(...Array.from(uint8Array.subarray(i, i + chunkSize)));
    }
    const base64Data = btoa(base64String);

    // 3. Call Gemini API
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
    const GEMINI_MODEL = Deno.env.get('GEMINI_MODEL') || 'gemini-flash-latest'
    
    if (!GEMINI_API_KEY) throw new Error('Gemini API key is not configured')

    const prompt = `
Analyze the following legal document and provide a structured summary in Markdown format.
If the information is not clearly specified, explicitly state "Not clearly specified in the document."

Use the following exact headings:
### Document Type
### Executive Summary
### Key Parties
### Important Dates
### Main Legal Issues
### Important Sections / Clauses
### Key Obligations
### Important Points
### Plain-English Explanation
`

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inlineData: { mimeType: 'application/pdf', data: base64Data } }
          ]
        }]
      })
    })

    const geminiData = await geminiRes.json()

    // 4. Handle Quota/Rate Limits (429)
    if (!geminiRes.ok) {
      const errorMsg = geminiData?.error?.message || 'Gemini API Error'
      await supabase.from('documents').update({ summary_status: 'failed' }).eq('id', documentId)
      
      if (geminiRes.status === 429) {
        throw new Error("We're temporarily unable to summarize this document. The AI service may have reached its current usage limit. Please try again later.")
      }
      
      throw new Error(errorMsg);
    }

    const summaryText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text
    if (!summaryText) {
      await supabase.from('documents').update({ summary_status: 'failed' }).eq('id', documentId)
      throw new Error('Failed to generate summary content from AI')
    }

    // 5. Save Summary
    await supabase.from('documents').update({ 
      summary_status: 'completed',
      summary_content: summaryText,
      summary_generated_at: new Date().toISOString()
    }).eq('id', documentId)

    return new Response(JSON.stringify({ status: 'completed', summary: summaryText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    const msg = (error as Error).message
    // Return friendly error
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
