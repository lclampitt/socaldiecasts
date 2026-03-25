import { useState } from 'react'
import { supabase } from '../supabaseClient'
import './TrackOrder.css'

function detectCarrier(trackingNum) {
  if (!trackingNum) return null
  const t = trackingNum.trim()
  if (/^1Z/i.test(t)) return 'ups'
  if (/^(94|93|92|91|90)\d{18,}/.test(t)) return 'usps'
  if (/^[0-9]{15}$/.test(t) || /^[0-9]{12}$/.test(t)) return 'fedex'
  if (/^D\d{10,}/i.test(t)) return 'ups'
  return null
}

function getCarrierLink(carrier, trackingNum) {
  switch (carrier) {
    case 'usps': return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNum}`
    case 'ups': return `https://www.ups.com/track?tracknum=${trackingNum}`
    case 'fedex': return `https://www.fedex.com/fedex/track/Track.do?tracknumbers=${trackingNum}`
    default: return null
  }
}

function getCarrierName(carrier) {
  switch (carrier) {
    case 'usps': return 'USPS'
    case 'ups': return 'UPS'
    case 'fedex': return 'FedEx'
    default: return 'Carrier'
  }
}

function getTimeline(order) {
  const createdDate = new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const status = order.status
  const hasTracking = !!order.carrier_tracking

  const statusRank = { paid: 1, shipped: 2, in_transit: 3, delivered: 4 }
  const rank = statusRank[status] || 1

  return [
    { label: 'Order Placed', done: true, date: createdDate },
    { label: 'Payment Confirmed', done: rank >= 1, date: createdDate },
    { label: 'Packed & Ready to Ship', done: hasTracking || rank >= 2, date: hasTracking ? '' : '' },
    { label: 'In Transit', done: rank >= 3, date: '' },
    { label: 'Delivered', done: rank >= 4, date: rank >= 4 ? 'Package delivered' : '' },
  ]
}

export default function TrackOrder() {
  const [orderNum, setOrderNum] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!orderNum.trim()) return
    setLoading(true)
    setError('')
    setResult(null)

    const { data, error: dbError } = await supabase
      .from('orders')
      .select('*')
      .eq('tracking_number', orderNum.trim())
      .single()

    setLoading(false)

    if (data && !dbError) {
      setResult(data)
    } else {
      setError('No order found with that order number. Please check your confirmation email.')
    }
  }

  const timeline = result ? getTimeline(result) : []
  const carrier = result ? detectCarrier(result.carrier_tracking) : null
  const carrierLink = carrier ? getCarrierLink(carrier, result.carrier_tracking) : null

  return (
    <div className="track-page container">
      <div className="page-header">
        <h1>Track Your Order</h1>
        <p>Enter your order number to see real-time status</p>
      </div>

      <div className="track-form-wrap">
        <form onSubmit={handleSubmit} className="track-form">
          <div className="form-group">
            <label>Order Number</label>
            <input
              type="text"
              value={orderNum}
              onChange={e => setOrderNum(e.target.value)}
              placeholder="e.g. SD1774412741525"
              className="track-input"
            />
          </div>
          <button type="submit" className="btn btn-primary track-submit" disabled={loading}>
            {loading ? 'Looking Up...' : 'Track Order'}
          </button>
        </form>

        {error && <div className="track-error">{error}</div>}

        {result && (
          <div className="track-result">
            <div className="track-result-header">
              <div>
                <p className="track-result-label">Order Number</p>
                <p className="track-result-num">{result.tracking_number}</p>
              </div>
              <div>
                <p className="track-result-label">Shipped To</p>
                <p className="track-result-addr">{result.shipping_address}</p>
              </div>
              <div className={`track-badge ${result.status}`}>{result.status?.replace('_', ' ')}</div>
            </div>

            <div className="track-order-info">
              <div className="track-info-row">
                <span>Customer</span>
                <span>{result.customer_name}</span>
              </div>
              <div className="track-info-row">
                <span>Order Total</span>
                <span>${Number(result.total).toFixed(2)}</span>
              </div>
              <div className="track-info-row">
                <span>Status</span>
                <span className="status-pill">{result.status?.replace('_', ' ')}</span>
              </div>
              {result.carrier_tracking && (
                <div className="track-info-row">
                  <span>Carrier Tracking</span>
                  <span className="carrier-tracking-num">{result.carrier_tracking}</span>
                </div>
              )}
              {carrierLink && (
                <div className="track-info-row">
                  <span></span>
                  <a
                    href={carrierLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="track-carrier-btn"
                  >
                    Track with {getCarrierName(carrier)} →
                  </a>
                </div>
              )}
            </div>

            <div className="track-timeline">
              {timeline.map((s, i) => (
                <div key={i} className={`timeline-step ${s.done ? 'done' : ''}`}>
                  <div className="timeline-dot">
                    {s.done ? '✓' : i === timeline.findIndex(x => !x.done) ? '●' : '○'}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className={`timeline-line ${s.done ? 'done' : ''}`} />
                  )}
                  <div className="timeline-info">
                    <p className="timeline-label">{s.label}</p>
                    {s.date && <p className="timeline-date">{s.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
