import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabaseClient'
import './Checkout.css'

const STEPS = ['Shipping', 'Payment', 'Review']

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: user?.email || '',
    address: '', city: '', state: '', zip: '',
  })

  const [payment] = useState({
    cardNumber: '•••• •••• •••• ••••',
    expiry: 'MM/YY',
    cvv: '•••',
  })

  const shippingCost = cartTotal >= 75 ? 0 : 9.99
  const tax = cartTotal * 0.08
  const orderTotal = cartTotal + shippingCost + tax

  function handleShippingChange(e) {
    setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleShippingSubmit(e) {
    e.preventDefault()
    const fields = Object.values(shipping)
    if (fields.some(v => !v.trim())) {
      setError('Please fill in all shipping fields.')
      return
    }
    setError('')
    setStep(1)
  }

  async function handlePlaceOrder() {
    setLoading(true)
    setError('')
    try {
      const orderData = {
        customer_email: shipping.email,
        customer_name: `${shipping.firstName} ${shipping.lastName}`,
        shipping_address: `${shipping.address}, ${shipping.city}, ${shipping.state} ${shipping.zip}`,
        items: cartItems.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        subtotal: cartTotal,
        shipping_cost: shippingCost,
        tax,
        total: orderTotal,
        status: 'pending',
        tracking_number: `PD${Date.now()}`,
      }

      const { error: dbError } = await supabase.from('orders').insert([orderData])
      if (dbError) {
        // Proceed even if DB not set up yet — demo mode
        console.warn('Supabase order insert error:', dbError.message)
      }

      clearCart()
      navigate('/', { state: { orderSuccess: true, trackingNumber: orderData.tracking_number } })
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="checkout-page container">
      <div className="page-header">
        <h1>Checkout</h1>
      </div>

      {/* Steps */}
      <div className="checkout-steps">
        {STEPS.map((s, i) => (
          <div key={s} className={`step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
            <span className="step-num">{i < step ? '✓' : i + 1}</span>
            <span className="step-label">{s}</span>
            {i < STEPS.length - 1 && <div className="step-line" />}
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        {/* Left: Form */}
        <div className="checkout-form-wrap">
          {error && <div className="checkout-error">{error}</div>}

          {/* Step 0: Shipping */}
          {step === 0 && (
            <form onSubmit={handleShippingSubmit} className="checkout-form">
              <h2>Shipping Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input name="firstName" value={shipping.firstName} onChange={handleShippingChange} placeholder="John" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input name="lastName" value={shipping.lastName} onChange={handleShippingChange} placeholder="Doe" />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input name="email" type="email" value={shipping.email} onChange={handleShippingChange} placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>Street Address</label>
                <input name="address" value={shipping.address} onChange={handleShippingChange} placeholder="123 Main St" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input name="city" value={shipping.city} onChange={handleShippingChange} placeholder="Los Angeles" />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input name="state" value={shipping.state} onChange={handleShippingChange} placeholder="CA" maxLength={2} />
                </div>
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input name="zip" value={shipping.zip} onChange={handleShippingChange} placeholder="90001" maxLength={10} />
              </div>
              <button type="submit" className="btn btn-primary form-submit-btn">
                Continue to Payment →
              </button>
            </form>
          )}

          {/* Step 1: Payment */}
          {step === 1 && (
            <div className="checkout-form">
              <h2>Payment Details</h2>
              <div className="stripe-placeholder">
                <div className="stripe-card-icon">💳</div>
                <p className="stripe-note">Secure payment powered by Stripe</p>
                <div className="stripe-fields">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input value="4242 4242 4242 4242" readOnly className="stripe-input" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input value="12/26" readOnly className="stripe-input" />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input value="•••" readOnly className="stripe-input" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Name on Card</label>
                    <input value={`${shipping.firstName} ${shipping.lastName}`} readOnly className="stripe-input" />
                  </div>
                </div>
                <p className="stripe-demo-note">
                  ⚠️ This is a Stripe placeholder. Connect your Stripe account to enable real payments.
                </p>
              </div>
              <div className="form-btns">
                <button className="btn btn-outline" onClick={() => setStep(0)}>← Back</button>
                <button className="btn btn-primary" onClick={() => setStep(2)}>Review Order →</button>
              </div>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <div className="checkout-form">
              <h2>Review Your Order</h2>
              <div className="review-section">
                <h3>Shipping To</h3>
                <p>{shipping.firstName} {shipping.lastName}</p>
                <p>{shipping.address}</p>
                <p>{shipping.city}, {shipping.state} {shipping.zip}</p>
                <p>{shipping.email}</p>
              </div>
              <div className="review-section">
                <h3>Items</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="review-item">
                    <span className="review-item-name">{item.name}</span>
                    <span className="review-item-qty">×{item.quantity}</span>
                    <span className="review-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="form-btns">
                <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button
                  className="btn btn-primary place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : `Place Order — $${orderTotal.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-items">
            {cartItems.map(item => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div className="checkout-item-info">
                  <p className="checkout-item-name">{item.name}</p>
                  <p className="checkout-item-qty">Qty: {item.quantity}</p>
                </div>
                <span className="checkout-item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="checkout-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="total-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total-divider" />
            <div className="total-row total-final">
              <span>Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
