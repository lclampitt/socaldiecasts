import { useState } from 'react'
import { supabase } from '../supabaseClient'
import './TrackOrder.css'

const MOCK_STATUSES = [
  { label: 'Order Placed', done: true, date: 'Mar 20, 2026' },
  { label: 'Payment Confirmed', done: true, date: 'Mar 20, 2026' },
  { label: 'Packed & Ready to Ship', done: true, date: 'Mar 21, 2026' },
  { label: 'In Transit', done: false, date: 'Expected Mar 24, 2026' },
  { label: 'Delivered', done: false, date: '' },
]

export default function TrackOrder() {
  const [trackingNum, setTrackingNum] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!trackingNum.trim()) return
    setLoading(true)
    setError('')
    setResult(null)

    // Try Supabase first
    const { data, error: dbError } = await supabase
      .from('orders')
      .select('*')
      .eq('tracking_number', trackingNum.trim())
      .single()

    setLoading(false)

    if (data && !dbError) {
      setResult({ fromDb: true, order: data })
    } else if (trackingNum.trim().startsWith('PD')) {
      // Demo mode: show placeholder tracking
      setResult({ fromDb: false, trackingNum: trackingNum.trim() })
    } else {
      setError('No order found with that order number. Please check your confirmation email.')
    }
  }

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
              value={trackingNum}
              onChange={e => setTrackingNum(e.target.value)}
              placeholder="e.g. SD1774412741525"
              className="track-input"
            />
          </div>
          <button type="submit" className="btn btn-primary track-submit" disabled={loading}>
            {loading ? 'Looking Up...' : 'Track Order'}
          </button>
        </form>

        {error && (
          <div className="track-error">{error}</div>
        )}

        {result && (
          <div className="track-result">
            <div className="track-result-header">
              <div>
                <p className="track-result-label">Order Number</p>
                <p className="track-result-num">
                  {result.fromDb ? result.order.tracking_number : result.trackingNum}
                </p>
              </div>
              {result.fromDb && (
                <div>
                  <p className="track-result-label">Shipped To</p>
                  <p className="track-result-addr">{result.order.shipping_address}</p>
                </div>
              )}
              <div className="track-badge in-transit">In Transit</div>
            </div>

            {result.fromDb && (
              <div className="track-order-info">
                <div className="track-info-row">
                  <span>Customer</span>
                  <span>{result.order.customer_name}</span>
                </div>
                <div className="track-info-row">
                  <span>Order Total</span>
                  <span>${Number(result.order.total).toFixed(2)}</span>
                </div>
                <div className="track-info-row">
                  <span>Status</span>
                  <span className="status-pill">{result.order.status}</span>
                </div>
              </div>
            )}

            <div className="track-timeline">
              {MOCK_STATUSES.map((s, i) => (
                <div key={i} className={`timeline-step ${s.done ? 'done' : ''}`}>
                  <div className="timeline-dot">
                    {s.done ? '✓' : i === MOCK_STATUSES.findIndex(x => !x.done) ? '●' : '○'}
                  </div>
                  {i < MOCK_STATUSES.length - 1 && (
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
