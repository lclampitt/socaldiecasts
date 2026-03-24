import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Diecasts from './pages/Diecasts'
import ShopByDriver from './pages/ShopByDriver'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import TrackOrder from './pages/TrackOrder'
import Feed from './pages/Feed'
import './styles/App.css'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/diecasts" element={<Diecasts />} />
                <Route path="/diecasts/:filter" element={<Diecasts />} />
                <Route path="/shop-by-driver" element={<ShopByDriver />} />
                <Route path="/shop-by-driver/:driver" element={<ShopByDriver />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/feed" element={<Feed />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}
