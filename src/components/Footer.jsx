import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="6" fill="#f0a500"/>
              <path d="M6 22l6-10 4 6 3-4 5 8H6z" fill="#0f2238"/>
              <circle cx="26" cy="14" r="4" fill="#0f2238"/>
            </svg>
            <div>
              <div className="footer-logo-main">SoCal Diecasts</div>
              <div className="footer-logo-sub">Your Premier NASCAR Die-Cast Dealer</div>
            </div>
          </div>
          <p className="footer-desc">
            Southern California's home for NASCAR die-cast collectibles. Authentic, high-quality replicas from your favorite drivers and teams.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Products</h4>
            <Link to="/diecasts">All Diecast</Link>
            <Link to="/diecasts/raced-wins">Raced Wins</Link>
            <Link to="/diecasts/elite-premier">Elite Premier</Link>
            <Link to="/diecasts/special-finishes">Special Finishes</Link>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <Link to="/shop-by-driver">Shop by Driver</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/track-order">Track Order</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} SoCal Diecasts. All rights reserved.</p>
          <p>NASCAR® is a registered trademark. Die-cast replicas are officially licensed products.</p>
        </div>
      </div>
    </footer>
  )
}
