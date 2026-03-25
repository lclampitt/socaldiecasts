import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import AuthModal from './AuthModal'
import './Header.css'

export default function Header() {
  const { cartCount } = useCart()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [productsOpen, setProductsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [authModal, setAuthModal] = useState(null) // 'login' | 'register'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const searchRef = useRef(null)
  const productsRef = useRef(null)

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false)
      if (productsRef.current && !productsRef.current.contains(e.target)) setProductsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setProductsOpen(false)
  }, [location])

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/diecasts?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const productLinks = [
    { label: 'All Diecast', path: '/diecasts' },
    { label: 'Raced Wins', path: '/diecasts/raced-wins' },
    { label: 'Elite Premier Editions', path: '/diecasts/elite-premier' },
    { label: 'Special Finishes', path: '/diecasts/special-finishes' },
  ]

  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="container header-top-inner">
            <div className="header-contact">
              <span>📞 1-800-555-0199</span>
              <span>·</span>
              <Link to="/contact">Contact Us</Link>
            </div>
            <div className="header-auth">
              {user ? (
                <div className="user-menu-wrapper">
                  <button
                    className="user-menu-btn"
                    onClick={() => setUserMenuOpen(prev => !prev)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                    {user.user_metadata?.first_name || user.email}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 10l5 5 5-5H7z"/>
                    </svg>
                  </button>
                  {userMenuOpen && (
                    <div className="user-dropdown">
                      <Link to="/track-order" onClick={() => setUserMenuOpen(false)}>Track Order</Link>
                      <button onClick={() => { signOut(); setUserMenuOpen(false) }}>Sign Out</button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="auth-link" onClick={() => setAuthModal('login')}>Login</button>
                  <span>|</span>
                  <button className="auth-link" onClick={() => setAuthModal('register')}>Register</button>
                </>
              )}
              <Link to="/cart" className="cart-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                <span>{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="header-main">
          <div className="container header-main-inner">
            {/* Logo */}
            <Link to="/" className="logo">
              <div className="logo-icon">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect width="36" height="36" rx="6" fill="#f0a500"/>
                  <path d="M6 22l6-10 4 6 3-4 5 8H6z" fill="#0f2238"/>
                  <circle cx="26" cy="14" r="4" fill="#0f2238"/>
                </svg>
              </div>
              <div className="logo-text">
                <span className="logo-main">SoCal</span>
                <span className="logo-sub">Diecasts</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="nav-desktop">
              {/* Products Dropdown */}
              <div className="nav-dropdown-wrapper" ref={productsRef}>
                <button
                  className={`nav-link ${productsOpen ? 'active' : ''}`}
                  onClick={() => setProductsOpen(prev => !prev)}
                >
                  Products
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 10l5 5 5-5H7z"/>
                  </svg>
                </button>
                <div className={`nav-dropdown ${productsOpen ? 'open' : ''}`}>
                  {productLinks.map(link => (
                    <Link key={link.path} to={link.path} className="nav-dropdown-item"
                      onClick={() => setProductsOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/shop-by-driver" className="nav-link">Shop by Driver</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/track-order" className="nav-link">Track Order</Link>
            </nav>

            {/* Search + Mobile toggle */}
            <div className="header-actions">
              <div className="search-wrapper" ref={searchRef}>
                <button
                  className="search-toggle"
                  onClick={() => setSearchOpen(prev => !prev)}
                  aria-label="Search"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </button>
                <div className={`search-dropdown ${searchOpen ? 'open' : ''}`}>
                  <form onSubmit={handleSearch} className="search-form">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="Search for products..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      autoFocus={searchOpen}
                    />
                    <button type="submit" className="search-go">Go</button>
                  </form>
                </div>
              </div>

              <button
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(prev => !prev)}
                aria-label="Menu"
              >
                <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-inner">
            <div className="mobile-products-label">Products</div>
            {productLinks.map(link => (
              <Link key={link.path} to={link.path} className="mobile-nav-link pl-4">
                {link.label}
              </Link>
            ))}
            <Link to="/shop-by-driver" className="mobile-nav-link">Shop by Driver</Link>
            <Link to="/about" className="mobile-nav-link">About</Link>
            <Link to="/contact" className="mobile-nav-link">Contact</Link>
            <Link to="/track-order" className="mobile-nav-link">Track Order</Link>
            <Link to="/cart" className="mobile-nav-link">
              Cart {cartCount > 0 && `(${cartCount})`}
            </Link>
            <div className="mobile-auth">
              {user ? (
                <button onClick={signOut} className="btn-outline">Sign Out</button>
              ) : (
                <>
                  <button onClick={() => { setAuthModal('login'); setMobileMenuOpen(false) }} className="btn-outline">Login</button>
                  <button onClick={() => { setAuthModal('register'); setMobileMenuOpen(false) }} className="btn-primary">Register</button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitch={m => setAuthModal(m)}
        />
      )}
    </>
  )
}
