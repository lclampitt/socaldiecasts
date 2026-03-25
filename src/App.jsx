import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import TrackOrder from './pages/TrackOrder'
import About from './pages/About'
import Contact from './pages/Contact'
import ShopByDriver from './pages/ShopByDriver'
import ProductDetail from './pages/ProductDetail'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:filter" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop-by-driver" element={<ShopByDriver />} />
                <Route path="/shop-by-driver/:driver" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
              </Routes>
            </main>
            <footer className="footer">
              <div className="footer-inner">
                <div className="footer-brand">
                  <img src="/logo.png" alt="SoCal Diecasts" className="footer-logo-img" />
                  <p>Premium NASCAR Diecast Collectibles</p>
                </div>
                <div className="footer-links">
                  <a href="/products">Shop</a>
                  <a href="/about">About</a>
                  <a href="/contact">Contact</a>
                  <a href="/track-order">Track Order</a>
                </div>
                <div className="footer-copy">
                  <p>&copy; {new Date().getFullYear()} SoCal Diecasts. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
