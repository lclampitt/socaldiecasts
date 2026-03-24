import React from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/ProductCard'
import './Home.css'

const FEATURED = PRODUCTS.slice(0, 4)

const CATEGORIES = [
  {
    label: 'All Diecast',
    path: '/diecasts',
    icon: '🏎️',
    desc: 'Browse our full collection of NASCAR die-cast replicas',
    count: PRODUCTS.length,
  },
  {
    label: 'Raced Wins',
    path: '/diecasts/raced-wins',
    icon: '🏆',
    desc: 'Authentic replicas of real race-winning cars',
    count: PRODUCTS.filter(p => p.category === 'Raced Win').length,
  },
  {
    label: 'Elite Premier',
    path: '/diecasts/elite-premier',
    icon: '⭐',
    desc: 'Premium detail with opening hoods and real rubber tires',
    count: PRODUCTS.filter(p => p.category === 'Elite Premier').length,
  },
  {
    label: 'Special Finishes',
    path: '/diecasts/special-finishes',
    icon: '✨',
    desc: 'Galaxy, liquid color, chrome, raw and flashcoat finishes',
    count: PRODUCTS.filter(p => p.category === 'Special Finish').length,
  },
]

export default function Home() {
  return (
    <div className="page-wrapper home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <div className="hero-badge">🏁 Southern California's #1 NASCAR Die-Cast Shop</div>
          <h1 className="hero-title">
            Collect the Cars<br />
            <span>That Made History</span>
          </h1>
          <p className="hero-sub">
            Officially licensed NASCAR die-cast replicas from your favorite drivers.
            From 1:24 scale to Elite Premier editions — we have them all.
          </p>
          <div className="hero-actions">
            <Link to="/diecasts" className="btn-primary hero-btn">Shop All Diecasts</Link>
            <Link to="/shop-by-driver" className="btn-outline hero-btn-outline">Shop by Driver</Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="container hero-stats-inner">
            <div className="hero-stat">
              <span className="stat-num">{PRODUCTS.length}+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="stat-num">28+</span>
              <span className="stat-label">Drivers</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="stat-num">4</span>
              <span className="stat-label">Collections</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="stat-num">Free</span>
              <span className="stat-label">Shipping $75+</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Collection</h2>
            <p>Find exactly what you're looking for</p>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map(cat => (
              <Link key={cat.path} to={cat.path} className="category-card">
                <div className="category-icon">{cat.icon}</div>
                <div className="category-body">
                  <h3>{cat.label}</h3>
                  <p>{cat.desc}</p>
                  <span className="category-count">{cat.count} items</span>
                </div>
                <svg className="category-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Die-Casts</h2>
            <Link to="/diecasts" className="section-link">
              View All
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
          <div className="products-grid">
            {FEATURED.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="cta-banner">
        <div className="container cta-inner">
          <div>
            <h2>Free Shipping on Orders Over $75</h2>
            <p>All orders ship within 1–2 business days. Track your order anytime.</p>
          </div>
          <Link to="/diecasts" className="btn-primary">Start Shopping</Link>
        </div>
      </section>
    </div>
  )
}
