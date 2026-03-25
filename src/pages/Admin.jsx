import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../context/AuthContext'
import './Admin.css'

const ADMIN_EMAIL = 'lclampitt44@outlook.com'

const STATUS_OPTIONS = ['paid', 'shipped', 'in_transit', 'delivered']

export default function Admin() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [trackingInputs, setTrackingInputs] = useState({})
  const [statusInputs, setStatusInputs] = useState({})
  const [saving, setSaving] = useState({})
  const [saved, setSaved] = useState({})

  useEffect(() => {
    if (!user) { navigate('/login', { state: { from: '/admin' } }); return }
    if (user.email !== ADMIN_EMAIL) return
    fetchOrders()
  }, [user])

  async function fetchOrders() {
    setLoading(true)
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    setOrders(data || [])
    const inputs = {}
    const statuses = {}
    data?.forEach(o => {
      inputs[o.id] = o.carrier_tracking || ''
      statuses[o.id] = o.status || 'paid'
    })
    setTrackingInputs(inputs)
    setStatusInputs(statuses)
    setLoading(false)
  }

  async function saveTracking(orderId) {
    setSaving(prev => ({ ...prev, [orderId]: true }))
    await supabase
      .from('orders')
      .update({
        carrier_tracking: trackingInputs[orderId],
        status: statusInputs[orderId],
      })
      .eq('id', orderId)
    setOrders(prev => prev.map(o =>
      o.id === orderId
        ? { ...o, carrier_tracking: trackingInputs[orderId], status: statusInputs[orderId] }
        : o
    ))
    setSaving(prev => ({ ...prev, [orderId]: false }))
    setSaved(prev => ({ ...prev, [orderId]: true }))
    setTimeout(() => setSaved(prev => ({ ...prev, [orderId]: false })), 2000)
  }

  if (!user) return null

  if (user.email !== ADMIN_EMAIL) {
    return (
      <div className="admin-unauthorized">
        <h2>Unauthorized</h2>
        <p>You don't have permission to view this page.</p>
      </div>
    )
  }

  return (
    <div className="admin-page container">
      <div className="admin-header">
        <h1>Orders</h1>
        <span className="admin-count">{orders.length} total</span>
      </div>

      {loading ? (
        <p className="admin-loading">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="admin-empty">No orders yet.</p>
      ) : (
        <div className="admin-orders">
          {orders.map(order => (
            <div key={order.id} className="admin-order-card">
              <div className="admin-order-top">
                <div className="admin-order-meta">
                  <span className="admin-order-num">{order.tracking_number}</span>
                  <span className={`admin-status-badge ${order.status}`}>{order.status}</span>
                </div>
                <span className="admin-order-date">
                  {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <div className="admin-order-body">
                <div className="admin-customer">
                  <p className="admin-label">Customer</p>
                  <p className="admin-value">{order.customer_name}</p>
                  <p className="admin-value admin-email">{order.customer_email}</p>
                  <p className="admin-value">{order.shipping_address}</p>
                </div>

                <div className="admin-items">
                  <p className="admin-label">Items</p>
                  {order.items?.map((item, i) => (
                    <p key={i} className="admin-value">{item.name} — ${Number(item.price).toFixed(2)}</p>
                  ))}
                </div>

                <div className="admin-total">
                  <p className="admin-label">Total</p>
                  <p className="admin-value admin-total-val">${Number(order.total).toFixed(2)}</p>
                </div>
              </div>

              <div className="admin-tracking-row">
                <div className="admin-tracking-input-wrap">
                  <label className="admin-label">Carrier Tracking Number</label>
                  <input
                    className="admin-tracking-input"
                    type="text"
                    placeholder="e.g. 9400111899223397765471"
                    value={trackingInputs[order.id] || ''}
                    onChange={e => setTrackingInputs(prev => ({ ...prev, [order.id]: e.target.value }))}
                  />
                </div>
                <div className="admin-status-select-wrap">
                  <label className="admin-label">Order Status</label>
                  <select
                    className="admin-status-select"
                    value={statusInputs[order.id] || 'paid'}
                    onChange={e => setStatusInputs(prev => ({ ...prev, [order.id]: e.target.value }))}
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
                <button
                  className={`admin-save-btn ${saved[order.id] ? 'saved' : ''}`}
                  onClick={() => saveTracking(order.id)}
                  disabled={saving[order.id]}
                >
                  {saved[order.id] ? '✓ Saved' : saving[order.id] ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
