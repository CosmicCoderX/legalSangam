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
    if (authError || !user) throw new Error('Unauthorized: ' + (authError?.message || 'No user'))

    const { advocateId, date, startTime, endTime } = await req.json()
    if (!advocateId || !date || !startTime || !endTime) throw new Error('Missing parameters')

    // Fetch advocate fee
    const { data: advocate, error: advocateError } = await supabase
      .from('advocates')
      .select('consultation_fee')
      .eq('id', advocateId)
      .single()

    if (advocateError || !advocate) throw new Error('Advocate not found')

    const fee = advocate.consultation_fee
    if (fee <= 0) throw new Error('Invalid fee')

    // Create Booking in DB first
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        client_id: user.id,
        advocate_id: advocateId,
        date,
        start_time: startTime,
        end_time: endTime,
        consultation_fee: fee,
        payment_status: 'pending',
        booking_status: 'pending'
      })
      .select()
      .single()

    if (bookingError) throw bookingError

    // Call Razorpay
    const auth = btoa(`${Deno.env.get('RAZORPAY_KEY_ID')}:${Deno.env.get('RAZORPAY_KEY_SECRET')}`)
    const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify({
        amount: fee * 100, // in paise
        currency: 'INR',
        receipt: booking.id
      })
    })

    const rzpData = await rzpRes.json()
    if (!rzpRes.ok) throw new Error(rzpData.error?.description || 'Razorpay error')

    // Update booking with Order ID
    await supabase.from('bookings').update({ razorpay_order_id: rzpData.id }).eq('id', booking.id)

    return new Response(JSON.stringify({ orderId: rzpData.id, amount: fee * 100, bookingId: booking.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
