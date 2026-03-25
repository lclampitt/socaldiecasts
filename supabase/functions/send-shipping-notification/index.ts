import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function detectCarrier(trackingNum: string): string | null {
  if (!trackingNum) return null
  const t = trackingNum.trim()
  if (/^1Z/i.test(t)) return 'ups'
  if (/^(94|93|92|91|90)\d{18,}/.test(t)) return 'usps'
  if (/^[0-9]{15}$/.test(t) || /^[0-9]{12}$/.test(t)) return 'fedex'
  if (/^D\d{10,}/i.test(t)) return 'ups'
  return null
}

function getCarrierLink(carrier: string, trackingNum: string): string | null {
  switch (carrier) {
    case 'usps': return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNum}`
    case 'ups': return `https://www.ups.com/track?tracknum=${trackingNum}`
    case 'fedex': return `https://www.fedex.com/fedex/track/Track.do?tracknumbers=${trackingNum}`
    default: return null
  }
}

function getCarrierName(carrier: string): string {
  switch (carrier) {
    case 'usps': return 'USPS'
    case 'ups': return 'UPS'
    case 'fedex': return 'FedEx'
    default: return 'the carrier'
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderId } = await req.json()

    // Fetch order details from Supabase
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)
    const { data: order, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (error || !order) {
      throw new Error('Order not found')
    }

    const { customer_email, customer_name, tracking_number, carrier_tracking } = order

    if (!carrier_tracking) {
      throw new Error('No tracking number on this order')
    }

    const carrier = detectCarrier(carrier_tracking)
    const carrierLink = carrier ? getCarrierLink(carrier, carrier_tracking) : null
    const carrierName = carrier ? getCarrierName(carrier) : null

    const trackingSection = carrierLink
      ? `
        <div style="background:#f7f7f7;border-radius:8px;padding:16px 20px;margin-bottom:16px;">
          <p style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#aaaaaa;margin:0 0 4px;">Carrier Tracking Number</p>
          <p style="font-size:16px;font-weight:700;font-family:monospace;color:#111111;margin:0 0 12px;">${carrier_tracking}</p>
          <a href="${carrierLink}" style="display:inline-block;background:#e9000c;color:#ffffff;padding:10px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;">
            Track with ${carrierName} →
          </a>
        </div>
      `
      : `
        <div style="background:#f7f7f7;border-radius:8px;padding:16px 20px;margin-bottom:16px;">
          <p style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#aaaaaa;margin:0 0 4px;">Carrier Tracking Number</p>
          <p style="font-size:16px;font-weight:700;font-family:monospace;color:#111111;margin:0;">${carrier_tracking}</p>
        </div>
      `

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#111111;padding:24px 32px;">
          <h1 style="color:#ffffff;margin:0;font-size:22px;letter-spacing:1px;">SOCAL DIECASTS</h1>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#111111;margin-bottom:4px;">Your Order Has Shipped!</h2>
          <p style="color:#888888;margin-bottom:24px;">Hi ${customer_name}, great news — your order is on its way.</p>

          <div style="background:#f7f7f7;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
            <p style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#aaaaaa;margin:0 0 4px;">Order Number</p>
            <p style="font-size:18px;font-weight:700;color:#111111;margin:0;">${tracking_number}</p>
          </div>

          ${trackingSection}

          <p style="color:#888888;font-size:13px;margin-top:24px;line-height:1.6;">
            You can also track your order anytime at
            <a href="https://socaldiecasts.com/track-order" style="color:#e9000c;">socaldiecasts.com/track-order</a>
            using your order number.
          </p>
        </div>
        <div style="background:#f7f7f7;padding:16px 32px;text-align:center;">
          <p style="color:#aaaaaa;font-size:12px;margin:0;">&copy; ${new Date().getFullYear()} SoCal Diecasts. All rights reserved.</p>
        </div>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SoCal Diecasts <orders@socaldiecasts.com>',
        to: customer_email,
        subject: `Your Order Has Shipped — ${tracking_number}`,
        html,
      }),
    })

    if (!res.ok) {
      const errBody = await res.text()
      throw new Error(`Resend error: ${errBody}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
