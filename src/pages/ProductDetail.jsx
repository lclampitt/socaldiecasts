import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import './ProductDetail.css'

const CATEGORY_LABELS = {
  'raced-win': 'Raced Win',
  'elite-premier': 'Elite Premier',
  'special-finish': 'Special Finish',
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, cartItems } = useCart()

  const product = products.find(p => p.id === Number(id))
  const [activeImg, setActiveImg] = useState(0)

  if (!product) {
    return (
      <div className="detail-not-found">
        <p>Product not found.</p>
        <Link to="/products" className="btn btn-primary">Back to Shop</Link>
      </div>
    )
  }

  const inCart = cartItems.some(item => item.id === product.id)

  function handleAdd() {
    addToCart(product)
  }

  const images = product.images || [product.image]

  return (
    <div className="detail-page">
      <div className="container">

        {/* Breadcrumb */}
        <nav className="detail-breadcrumb">
          <button onClick={() => navigate(-1)} className="breadcrumb-back">← Back</button>
          <span className="breadcrumb-sep">/</span>
          <Link to="/products">All Products</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to={`/products/${product.category}`}>{CATEGORY_LABELS[product.category]}</Link>
        </nav>

        {/* Main layout */}
        <div className="detail-layout">

          {/* Image panel */}
          <div className="detail-images">
            <div className="detail-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`detail-thumb ${i === activeImg ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
            <div className="detail-main-img-wrap">
              <img
                src={images[activeImg]}
                alt={product.name}
                className="detail-main-img"
              />
            </div>
          </div>

          {/* Info panel */}
          <div className="detail-info">
            <p className="detail-driver">{product.driver}</p>
            <h1 className="detail-title">{product.name}</h1>

            <div className="detail-meta">
              <span className="detail-condition">Condition: <strong>New</strong></span>
              <span className="detail-category">{CATEGORY_LABELS[product.category]}</span>
            </div>

            <div className="detail-price">${product.price.toFixed(2)}</div>

            <button
              className={`btn detail-add-btn ${inCart ? 'btn-outline' : 'btn-primary'}`}
              onClick={handleAdd}
            >
              {inCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            {inCart && (
              <Link to="/cart" className="detail-view-cart">View Cart →</Link>
            )}

            <div className="detail-divider" />

            <div className="detail-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="detail-specs">
              <div className="detail-spec-row">
                <span>Scale</span>
                <span>1:24</span>
              </div>
              <div className="detail-spec-row">
                <span>Driver</span>
                <span>{product.driver}</span>
              </div>
              <div className="detail-spec-row">
                <span>Category</span>
                <span>{CATEGORY_LABELS[product.category]}</span>
              </div>
              {product.limited && (
                <div className="detail-spec-row">
                  <span>Edition Size</span>
                  <span>{product.limited}</span>
                </div>
              )}
              <div className="detail-spec-row">
                <span>Availability</span>
                <span className="in-stock-label">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
