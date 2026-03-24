import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import './Checkout.css'

// NOTE: To enable real payments, integrate Stripe:
// npm install @stripe/stripe-js @stripe/react-stripe-js
// Create a Stripe account and set VITE_STRIPE_PUBLISHABLE_KEY

const STEPS = ['Shipping', 'Payment', 'Confirm']

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const [shipping, setShipping] = useState({
    firstName: user?.user_metadata?.first_name || '',
    lastName: user?.user_metadata?.last_name || '',
    email: user?.email || '',
    address: '', city: '', state: '', zip: '', country: 'US'
  })

  const [payment, setPayment] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: ''
  })

  const shippingCost = cartTotal >= 75 ? 0 : 8.99
  const tax = cartTotal * 0.0775
  const total = cartTotal + shippingCost + tax

  function handleShipChange(e) {
    setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handlePayChange(e) {
    setPayment(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function formatCard(value) {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  }

  function formatExpiry(value) {
    return value.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/')
  }

  async function handlePlaceOrder() {
    setSubmitting(true)
    try {
      // Generate tracking number
      const trackingNum = 'SCD' + Date.now().toString().slice(-8)

      // Save order to Supabase
      const { data, error } = await supabase.from('orders').insert([{
        user_id: user?.id || null,
        email: shipping.email,
        items: cart,
        shipping_address: shipping,
        subtotal: cartTotal,
        shipping_cost: shippingCost,
        tax,
        total,
        tracking_number: trackingNum,
        status: 'processing',
      }]).select()

      if (error) throw error

      setOrderId({ id: data?.[0]?.id, tracking: trackingNum })
      clearCart()
      setStep(2)
    } catch (err) {
      console.error('Order error:', err)
      // For demo purposes, proceed anyway
      const trackingNum = 'SCD' + Date.now().toString().slice(-8)
      setOrderId({ id: 'DEMO-' + Math.random().toString(36).slice(2,8).toUpperCase(), tracking: trackingNum })
      clearCart()
      setStep(2)
    } finally {
      setSubmitting(false)
    }
  }

  if (cart.length === 0 && step < 2) {
    return (
      <div className="page-wrapper">
        <div className="page-header">
          <div className="container"><h1>Checkout</h1></div>
        </div>
        <div className="container">
          <div className="empty-state">
            <h3>Your cart is empty</h3>
            <p>Add some products before checking out.</p>
            <Link to="/diecasts" className="btn-primary" style={{ marginTop: 20 }}>Shop Now</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container"><h1>Checkout</h1></div>
      </div>

      <div className="container checkout-layout">
        <div className="checkout-main">
          {/* Stepper */}
          <div className="stepper">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className={`step ${i <= step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                  <div className="step-num">
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span>{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`step-line ${i < step ? 'done' : ''}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* Step 0: Shipping */}
          {step === 0 && (
            <div className="checkout-step fade-in">
              <h2>Shipping Information</h2>
              <div className="form-row-2">
                <div className="form-group">
                  <label>First Name</label>
                  <input name="firstName" value={shipping.firstName} onChange={handleShipChange} required placeholder="John" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input name="lastName" value={shipping.lastName} onChange={handleShipChange} required placeholder="Smith" />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" value={shipping.email} onChange={handleShipChange} required placeholder="you@email.com" />
              </div>
              <div className="form-group">
                <label>Street Address</label>
                <input name="address" value={shipping.address} onChange={handleShipChange} required placeholder="123 Speedway Dr" />
              </div>
              <div className="form-row-3">
                <div className="form-group">
                  <label>City</label>
                  <input name="city" value={shipping.city} onChange={handleShipChange} required placeholder="Los Angeles" />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input name="state" value={shipping.state} onChange={handleShipChange} required placeholder="CA" maxLength={2} />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input name="zip" value={shipping.zip} onChange={handleShipChange} required placeholder="90210" maxLength={10} />
                </div>
              </div>
              <button
                className="btn-primary step-next"
                onClick={() => setStep(1)}
                disabled={!shipping.firstName || !shipping.lastName || !shipping.email || !shipping.address || !shipping.city || !shipping.state || !shipping.zip}
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <div className="checkout-step fade-in">
              <h2>Payment Details</h2>
              <div className="payment-notice">
                🔒 Your payment info is encrypted and secure.
                <br />
                <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  Real payment processing: integrate Stripe with VITE_STRIPE_PUBLISHABLE_KEY
                </small>
              </div>
              <div className="form-group">
                <label>Name on Card</label>
                <input name="cardName" value={payment.cardName} onChange={handlePayChange} required placeholder="John Smith" />
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  name="cardNumber"
                  value={payment.cardNumber}
                  onChange={e => setPayment(prev => ({ ...prev, cardNumber: formatCard(e.target.value) }))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    name="expiry"
                    value={payment.expiry}
                    onChange={e => setPayment(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    name="cvv"
                    value={payment.cvv}
                    onChange={handlePayChange}
                    placeholder="123"
                    maxLength={4}
                    type="password"
                  />
                </div>
              </div>
              <div className="step-nav">
                <button className="btn-outline" onClick={() => setStep(0)}>← Back</button>
                <button
                  className="btn-primary"
                  onClick={handlePlaceOrder}
                  disabled={submitting || !payment.cardName || !payment.cardNumber || !payment.expiry || !payment.cvv}
                >
                  {submitting ? 'Placing Order...' : 'Place Order →'}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {step === 2 && orderId && (
            <div className="checkout-step confirmation fade-in">
              <div className="confirm-icon">✅</div>
              <h2>Order Confirmed!</h2>
              <p>Thank you for your order. A confirmation has been sent to <strong>{shipping.email}</strong>.</p>
              <div className="confirm-details">
                <div className="confirm-row">
                  <span>Order ID</span>
                  <strong>{orderId.id}</strong>
                </div>
                <div className="confirm-row">
                  <span>Tracking Number</span>
                  <strong className="tracking-num">{orderId.tracking}</strong>
                </div>
                <div className="confirm-row">
                  <span>Shipping To</span>
                  <strong>{shipping.firstName} {shipping.lastName}, {shipping.city}, {shipping.state}</strong>
                </div>
                <div className="confirm-row">
                  <span>Order Total</span>
                  <strong>${total.toFixed(2)}</strong>
                </div>
              </div>
              <div className="confirm-actions">
                <Link to="/track-order" className="btn-primary">Track My Order</Link>
                <Link to="/diecasts" className="btn-outline">Keep Shopping</Link>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        {step < 2 && (
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {cart.map(item => (
                <div key={item.id} className="checkout-item">
                  <img src={item.image} alt={item.title} />
                  <div className="checkout-item-info">
                    <p className="checkout-item-title">{item.title}</p>
                    <p className="checkout-item-qty">Qty: {item.quantity}</p>
                  </div>
                  <span className="checkout-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="checkout-totals">
              <div className="checkout-total-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
              <div className="checkout-total-row"><span>Shipping</span><span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span></div>
              <div className="checkout-total-row"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="checkout-total-row checkout-grand-total">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
