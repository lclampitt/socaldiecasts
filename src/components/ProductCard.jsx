import React from 'react'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="product-card fade-in">
      <div className="product-card-img-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-card-img"
          loading="lazy"
        />
        <div className="product-card-badge">{product.category}</div>
      </div>
      <div className="product-card-body">
        <p className="product-card-driver">{product.driver}</p>
        <h3 className="product-card-title">{product.title}</h3>
        <p className="product-card-sku">SKU: {product.sku}</p>
        <div className="product-card-footer">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          <button
            className="btn-primary product-card-btn"
            onClick={() => addToCart(product)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
