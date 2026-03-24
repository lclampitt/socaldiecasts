import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

export default function Cart() {
  const { cart, cartTotal, removeFromCart, updateQuantity } = useCart()

  if (cart.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="page-header">
          <div className="container">
            <h1>Your Cart</h1>
            <p>Items ready for checkout</p>
          </div>
        </div>
        <div className="container">
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added any die-casts yet.</p>
            <Link to="/diecasts" className="btn-primary" style={{ marginTop: 20 }}>Shop Now</Link>
          </div>
        </div>
      </div>
    )
  }

  const shipping = cartTotal >= 75 ? 0 : 8.99
  const tax = cartTotal * 0.0775
  const orderTotal = cartTotal + shipping + tax

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1>Your Cart</h1>
          <p>{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="container cart-layout">
        {/* Cart items */}
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-img" />
              <div className="cart-item-info">
                <p className="cart-item-driver">{item.driver}</p>
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-sku">SKU: {item.sku}</p>
              </div>
              <div className="cart-item-qty">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Decrease"
                >−</button>
                <span>{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Increase"
                >+</button>
              </div>
              <div className="cart-item-price">
                ${(item.price * item.quantity).toFixed(2)}
                <span className="cart-item-unit">${item.price.toFixed(2)} ea.</span>
              </div>
              <button
                className="cart-remove"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4h6v2"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>
                {shipping === 0
                  ? <span className="free-ship">FREE</span>
                  : `$${shipping.toFixed(2)}`
                }
              </span>
            </div>
            {shipping > 0 && (
              <p className="ship-note">
                Add ${(75 - cartTotal).toFixed(2)} more for free shipping!
              </p>
            )}
            <div className="summary-row">
              <span>Tax (7.75%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>

          <Link to="/checkout" className="btn-primary checkout-btn">
            Proceed to Checkout
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          <Link to="/diecasts" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
