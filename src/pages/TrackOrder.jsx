import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import './TrackOrder.css'

const STATUS_STEPS = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered']

export default function TrackOrder() {
  const { user } = useAuth()
  const [trackingInput, setTrackingInput] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleTrack(e) {
    e.preventDefault()
    setError('')
    setOrder(null)
    setLoading(true)

    try {
      const { data, error: dbError } = await supabase
        .from('orders')
        .select('*')
        .eq('tracking_number', trackingInput.trim().toUpperCase())
        .single()

      if (dbError || !data) {
        setError('No order found with that tracking number. Please check and try again.')
      } else {
        setOrder(data)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const statusIndex = order
    ? STATUS_STEPS.findIndex(s => s.toLowerCase() === order.status?.toLowerCase()) ?? 1
    : -1

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1>Track Your Order</h1>
          <p>Enter your tracking number to see real-time order status</p>
        </div>
      </div>

      <div className="container track-layout">
        <div className="track-form-wrap">
          <form onSubmit={handleTrack} className="track-form">
            <div className="form-group">
              <label>Tracking Number</label>
              <input
                value={trackingInput}
                onChange={e => setTrackingInput(e.target.value)}
                placeholder="e.g. SCD12345678"
                required
              />
            </div>
            <button type="submit" className="btn-primary track-btn" disabled={loading}>
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </form>

          {error && <div className="track-error">{error}</div>}

          {order && (
            <div className="track-result fade-in">
              <div className="track-header">
                <div>
                  <p className="track-label">Order ID</p>
                  <p className="track-value">#{order.id}</p>
                </div>
                <div>
                  <p className="track-label">Tracking #</p>
                  <p className="track-value tracking">{order.tracking_number}</p>
                </div>
                <div>
                  <p className="track-label">Status</p>
                  <span className={`status-badge status-${order.status?.replace(' ', '-').toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="track-progress">
                {STATUS_STEPS.map((step, i) => (
                  <React.Fragment key={step}>
                    <div className={`track-step ${i <= statusIndex ? 'done' : ''} ${i === statusIndex ? 'current' : ''}`}>
                      <div className="track-step-dot" />
                      <span>{step}</span>
                    </div>
                    {i < STATUS_STEPS.length - 1 && (
                      <div className={`track-step-line ${i < statusIndex ? 'done' : ''}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Order items */}
              <div className="track-items">
                <h3>Items in This Order</h3>
                {order.items?.map((item, i) => (
                  <div key={i} className="track-item">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <p className="track-item-title">{item.title}</p>
                      <p className="track-item-qty">Qty: {item.quantity} · ${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {order.shipping_address && (
                <div className="track-shipping">
                  <h3>Shipping To</h3>
                  <p>
                    {order.shipping_address.firstName} {order.shipping_address.lastName}<br />
                    {order.shipping_address.address}<br />
                    {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="track-info">
          <div className="track-info-card">
            <h3>Need Help?</h3>
            <p>If you can't find your order or have questions, contact us and we'll assist you right away.</p>
            <a href="/contact" className="btn-outline" style={{ marginTop: 14, display: 'inline-block' }}>Contact Us</a>
          </div>
          <div className="track-info-card">
            <h3>Shipping Times</h3>
            <ul className="ship-times">
              <li><span>Processing</span><strong>1–2 days</strong></li>
              <li><span>Standard</span><strong>5–7 days</strong></li>
              <li><span>Express</span><strong>2–3 days</strong></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
