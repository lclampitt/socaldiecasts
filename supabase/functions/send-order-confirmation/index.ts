const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { customerEmail, customerName, orderNumber, items, subtotal, shippingCost, tax, total } = await req.json()

    const itemRows = items.map((item: any) =>
      `<tr>
        <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${item.name}</td>
        <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;text-align:right;">$${item.price.toFixed(2)}</td>
      </tr>`
    ).join('')

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;">
        <div style="background:#111111;padding:24px 32px;">
          <h1 style="color:#ffffff;margin:0;font-size:22px;letter-spacing:1px;">SOCAL DIECASTS</h1>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#111111;margin-bottom:4px;">Order Confirmed!</h2>
          <p style="color:#888888;margin-bottom:24px;">Hi ${customerName}, thanks for your purchase.</p>

          <div style="background:#f7f7f7;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
            <p style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#aaaaaa;margin:0 0 4px;">Order Number</p>
            <p style="font-size:18px;font-weight:700;color:#111111;margin:0;">${orderNumber}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
            ${itemRows}
          </table>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:4px 0;color:#888888;">Subtotal</td>
              <td style="padding:4px 0;text-align:right;">$${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#888888;">Shipping</td>
              <td style="padding:4px 0;text-align:right;">${shippingCost === 0 ? 'FREE' : '$' + shippingCost.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding:4px 0;color:#888888;">Tax</td>
              <td style="padding:4px 0;text-align:right;">$${tax.toFixed(2)}</td>
            </tr>
            <tr style="border-top:2px solid #111111;">
              <td style="padding:10px 0 4px;font-weight:700;font-size:16px;">Total</td>
              <td style="padding:10px 0 4px;text-align:right;font-weight:700;font-size:16px;">$${total.toFixed(2)}</td>
            </tr>
          </table>

          <p style="color:#888888;font-size:13px;margin-top:24px;line-height:1.6;">
            You can track your order at <a href="https://socaldiecasts.com/track-order" style="color:#e9000c;">socaldiecasts.com/track-order</a> using your order number.
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
        from: 'SoCal Diecasts <onboarding@resend.dev>',
        to: customerEmail,
        subject: `Order Confirmed — ${orderNumber}`,
        html,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(err)
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
