import { useLocation, Link } from 'react-router-dom'
import './OrderSuccess.css'

export default function OrderSuccess() {
  const { state } = useLocation()
  const orderNumber = state?.trackingNumber || `SD${Date.now()}`

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <div className="order-success-icon">✓</div>
        <h1>Thank You for Your Purchase!</h1>
        <p className="order-success-sub">Your order has been placed and is being processed.</p>
        <div className="order-number-box">
          <span className="order-number-label">Order Number</span>
          <span className="order-number-value">{orderNumber}</span>
        </div>
        <p className="order-success-note">
          Save your order number to track your shipment. You can check your order status anytime on the Track Order page.
        </p>
        <div className="order-success-actions">
          <Link to="/" className="btn btn-primary">Return to Home</Link>
          <Link to="/track-order" className="btn btn-outline">Track Order</Link>
        </div>
      </div>
    </div>
  )
}
