import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabaseClient'
import './Checkout.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const STEPS = ['Shipping', 'Review', 'Payment']

function PaymentForm({ onBack, onSuccess, orderTotal }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + '/order-success' },
      redirect: 'if_required',
    })

    if (stripeError) {
      setError(stripeError.message)
      setLoading(false)
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Payment Details</h2>
      {error && <div className="checkout-error">{error}</div>}
      <PaymentElement />
      <div className="form-btns" style={{ marginTop: '24px' }}>
        <button type="button" className="btn btn-outline" onClick={onBack}>← Back</button>
        <button type="submit" className="btn btn-primary" disabled={!stripe || loading}>
          {loading ? 'Processing...' : `Pay $${orderTotal.toFixed(2)}`}
        </button>
      </div>
    </form>
  )
}

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [clientSecret, setClientSecret] = useState('')

  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: user?.email || '',
    address: '', city: '', state: '', zip: '',
  })

  const shippingCost = cartTotal >= 75 ? 0 : 9.99
  const tax = cartTotal * 0.08
  const orderTotal = cartTotal + shippingCost + tax

  function handleShippingChange(e) {
    setShipping(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleShippingSubmit(e) {
    e.preventDefault()
    if (Object.values(shipping).some(v => !v.trim())) {
      setError('Please fill in all shipping fields.')
      return
    }
    setError('')
    setStep(1)
  }

  async function handleProceedToPayment() {
    setLoading(true)
    setError('')
    try {
      const { data, error: fnError } = await supabase.functions.invoke('create-payment-intent', {
        body: { amount: orderTotal },
      })
      if (fnError || data.error) throw new Error(fnError?.message || data.error)
      setClientSecret(data.clientSecret)
      setStep(2)
    } catch (err) {
      setError('Could not initialize payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handlePaymentSuccess() {
    const orderData = {
      customer_email: shipping.email,
      customer_name: `${shipping.firstName} ${shipping.lastName}`,
      shipping_address: `${shipping.address}, ${shipping.city}, ${shipping.state} ${shipping.zip}`,
      items: cartItems.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
      subtotal: cartTotal,
      shipping_cost: shippingCost,
      tax,
      total: orderTotal,
      status: 'paid',
      tracking_number: `SD${Date.now()}`,
    }

    const { error: dbError } = await supabase.from('orders').insert([orderData])
    if (dbError) console.warn('Order save error:', dbError.message)

    await supabase.functions.invoke('send-order-confirmation', {
      body: {
        customerEmail: shipping.email,
        customerName: `${shipping.firstName} ${shipping.lastName}`,
        orderNumber: orderData.tracking_number,
        items: orderData.items,
        subtotal: cartTotal,
        shippingCost,
        tax,
        total: orderTotal,
        shippingAddress: `${shipping.address}, ${shipping.city}, ${shipping.state} ${shipping.zip}`,
      },
    })

    clearCart()
    navigate('/order-success', { state: { trackingNumber: orderData.tracking_number } })
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
                Continue to Review →
              </button>
            </form>
          )}

          {/* Step 1: Review */}
          {step === 1 && (
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
                    <span className="review-item-price">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="review-section">
                <h3>Order Total</h3>
                <div className="review-item">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="review-item">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="review-item">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="review-item review-item--total">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="form-btns">
                <button className="btn btn-outline" onClick={() => setStep(0)}>← Back</button>
                <button className="btn btn-primary" onClick={handleProceedToPayment} disabled={loading}>
                  {loading ? 'Loading...' : 'Confirm & Pay →'}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm
                onBack={() => setStep(1)}
                onSuccess={handlePaymentSuccess}
                orderTotal={orderTotal}
              />
            </Elements>
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
