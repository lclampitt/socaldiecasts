import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PRODUCTS, DRIVERS } from '../data/products'
import ProductCard from '../components/ProductCard'
import './ShopByDriver.css'

export default function ShopByDriver() {
  const { driver } = useParams()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const selectedDriver = driver ? decodeURIComponent(driver) : null

  const filteredDrivers = DRIVERS.filter(d =>
    d.toLowerCase().includes(search.toLowerCase())
  )

  const driverProducts = selectedDriver
    ? PRODUCTS.filter(p => p.driver === selectedDriver)
    : []

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1>{selectedDriver ? selectedDriver : 'Shop by Driver'}</h1>
          <p>
            {selectedDriver
              ? `${driverProducts.length} product${driverProducts.length !== 1 ? 's' : ''} available`
              : 'Select a driver to browse their die-cast collection'}
          </p>
        </div>
      </div>

      <div className="container sbd-layout">
        {/* Driver sidebar */}
        <aside className="sbd-sidebar">
          <div className="sbd-search-wrap">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search drivers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="sbd-search"
            />
          </div>
          <div className="sbd-driver-list">
            {filteredDrivers.map(d => (
              <button
                key={d}
                className={`sbd-driver-btn ${selectedDriver === d ? 'active' : ''}`}
                onClick={() => navigate(`/shop-by-driver/${encodeURIComponent(d)}`)}
              >
                <span className="driver-initials">
                  {d.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
                {d}
              </button>
            ))}
            {filteredDrivers.length === 0 && (
              <p className="no-drivers">No drivers found</p>
            )}
          </div>
        </aside>

        {/* Right: products or grid of driver names */}
        <div className="sbd-main">
          {selectedDriver ? (
            <>
              <div className="sbd-driver-header">
                <h2>{selectedDriver}</h2>
              </div>
              {driverProducts.length === 0 ? (
                <div className="empty-state">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 12h8M12 8v8"/>
                  </svg>
                  <h3>No products yet</h3>
                  <p>We don't have any die-casts listed for {selectedDriver} right now. Check back soon!</p>
                </div>
              ) : (
                <div className="products-grid">
                  {driverProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              )}
            </>
          ) : (
            <div className="sbd-all-drivers">
              <h2>All Drivers</h2>
              <div className="sbd-driver-tiles">
                {DRIVERS.map(d => (
                  <button
                    key={d}
                    className="sbd-driver-tile"
                    onClick={() => navigate(`/shop-by-driver/${encodeURIComponent(d)}`)}
                  >
                    <span className="tile-initials">
                      {d.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                    <span className="tile-name">{d}</span>
                    <span className="tile-count">
                      {PRODUCTS.filter(p => p.driver === d).length} items
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
