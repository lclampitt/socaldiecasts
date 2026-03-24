import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('socaldiecasts_cart')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  const [toasts, setToasts] = useState([])

  useEffect(() => {
    localStorage.setItem('socaldiecasts_cart', JSON.stringify(cart))
  }, [cart])

  function addToast(message) {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }

  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    addToast(`"${product.title.substring(0, 40)}..." added to cart!`)
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  function updateQuantity(productId, qty) {
    if (qty < 1) { removeFromCart(productId); return }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    )
  }

  function clearCart() {
    setCart([])
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart, cartCount, cartTotal,
      addToCart, removeFromCart, updateQuantity, clearCart
    }}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className="toast">{t.message}</div>
        ))}
      </div>
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
