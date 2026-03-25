import React, { useMemo } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { PRODUCTS, filterProducts, searchProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import './Diecasts.css'

const FILTER_META = {
  undefined:          { label: 'All Diecast',         desc: 'Browse our complete NASCAR die-cast collection.' },
  'raced-wins':       { label: 'Raced Wins',           desc: 'Authentic replicas of cars that actually won on race day.' },
  'elite-premier':    { label: 'Elite Premier Editions', desc: 'Premium die-casts with opening hoods, real rubber tires & detailed engines.' },
  'special-finishes': { label: 'Special Finishes',     desc: 'Galaxy, liquid color, color chrome, raw metal & flashcoat finishes.' },
}

const FILTER_LINKS = [
  { label: 'All Diecast',          path: '/diecasts' },
  { label: 'Raced Wins',           path: '/diecasts/raced-wins' },
  { label: 'Elite Premier',        path: '/diecasts/elite-premier' },
  { label: 'Special Finishes',     path: '/diecasts/special-finishes' },
]

export default function Diecasts() {
  const { filter } = useParams()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const filtered = useMemo(() => {
    let list = filterProducts(PRODUCTS, filter)
    if (searchQuery) list = searchProducts(list, searchQuery)
    return list
  }, [filter, searchQuery])

  const meta = FILTER_META[filter] || FILTER_META['undefined']

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1>{searchQuery ? `Search: "${searchQuery}"` : meta.label}</h1>
          <p>{searchQuery ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''} found` : meta.desc}</p>
        </div>
      </div>

      <div className="container diecasts-layout">
        {/* Sidebar */}
        <aside className="diecasts-sidebar">
          <div className="sidebar-section">
            <h3>Collections</h3>
            {FILTER_LINKS.map(fl => (
              <Link
                key={fl.path}
                to={fl.path}
                className={`sidebar-link ${
                  (filter === undefined && fl.path === '/diecasts') ||
                  fl.path === `/diecasts/${filter}`
                    ? 'active' : ''
                }`}
              >
                {fl.label}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main */}
        <div className="diecasts-main">
          <div className="diecasts-toolbar">
            <span className="product-count">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <h3>No products found</h3>
              <p>{searchQuery ? `No results for "${searchQuery}". Try a different search.` : 'No products in this category yet.'}</p>
              <Link to="/diecasts" className="btn-primary" style={{ marginTop: 16 }}>Browse All</Link>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
