import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { cartCount } = useCart()
  const { user, displayName, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [productsOpen, setProductsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const searchInputRef = useRef(null)
  const productsRef = useRef(null)

  useEffect(() => {
    setProductsOpen(false)
    setSearchOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    function handleClick(e) {
      if (productsRef.current && !productsRef.current.contains(e.target)) {
        setProductsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <>
      <header className="site-header">
        {/* Top Bar — black, logo + actions */}
        <div className="header-top">
          <div className="header-top-inner">
            <Link to="/" className="header-logo">
              <img src="/logo.png" alt="SoCal Diecasts" className="header-logo-img" />
            </Link>

            <div className="header-actions">
              {/* Search */}
              <button
                className={`header-action-btn ${searchOpen ? 'active' : ''}`}
                onClick={() => setSearchOpen(v => !v)}
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <span>Search</span>
              </button>

              {/* Cart */}
              <Link to="/cart" className="header-action-btn cart-btn" aria-label="Cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span>Cart {cartCount > 0 && <span className="cart-count">({cartCount})</span>}</span>
              </Link>

              {/* Auth */}
              {user ? (
                <>
                  <span className="header-greeting">Hi, {displayName?.split(' ')[0]}</span>
                  <button className="header-btn" onClick={handleSignOut}>Log Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="header-btn">Log In</Link>
                  <Link to="/register" className="header-btn header-btn-solid">Sign Up</Link>
                </>
              )}

              {/* Mobile hamburger */}
              <button className="hamburger" onClick={() => setMobileOpen(v => !v)} aria-label="Menu">
                <span className={`ham-line ${mobileOpen ? 'open' : ''}`}></span>
                <span className={`ham-line ${mobileOpen ? 'open' : ''}`}></span>
                <span className={`ham-line ${mobileOpen ? 'open' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar — white, nav links */}
        <nav className="header-nav">
          <div className="header-nav-inner">
            <div className="nav-dropdown" ref={productsRef}>
              <button
                className={`nav-link nav-link-btn ${productsOpen ? 'active' : ''}`}
                onClick={() => setProductsOpen(v => !v)}
              >
                Products
                <svg className={`chevron ${productsOpen ? 'open' : ''}`} width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {productsOpen && (
                <div className="dropdown-menu">
                  <Link to="/products" className="dropdown-item">All Diecasts</Link>
                  <Link to="/products/raced-win" className="dropdown-item">Raced Wins</Link>
                  <Link to="/products/elite-premier" className="dropdown-item">Elite Premier Editions</Link>
<Link to="/products/special-finish" className="dropdown-item">Special Finishes</Link>
                </div>
              )}
            </div>

            <Link to="/shop-by-driver" className="nav-link">Shop By Driver</Link>
            <Link to="/track-order" className="nav-link">Track Order</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        </nav>

        {/* Search dropdown */}
        <div className={`search-bar-dropdown ${searchOpen ? 'open' : ''}`}>
          <form onSubmit={handleSearch} className="search-form">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by driver, series, or car name..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-go-btn">Search</button>
          </form>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <Link to="/products" className="mobile-link">All Diecasts</Link>
          <Link to="/products/raced-win" className="mobile-link">Raced Wins</Link>
          <Link to="/products/elite-premier" className="mobile-link">Elite Premier Editions</Link>
<Link to="/products/special-finish" className="mobile-link">Special Finishes</Link>
          <Link to="/shop-by-driver" className="mobile-link">Shop By Driver</Link>
          <Link to="/track-order" className="mobile-link">Track My Order</Link>
          <Link to="/about" className="mobile-link">About</Link>
          <Link to="/contact" className="mobile-link">Contact</Link>
          <div className="mobile-auth">
            {user ? (
              <button className="header-btn" onClick={handleSignOut}>Log Out</button>
            ) : (
              <>
                <Link to="/login" className="header-btn">Log In</Link>
                <Link to="/register" className="header-btn header-btn-solid">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
