import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart()
  const inCart = cartItems.some(item => item.id === product.id)

  function handleAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <p className="product-driver">{product.driver}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className={`btn add-to-cart-btn ${inCart ? 'in-cart' : 'btn-primary'}`}
            onClick={handleAdd}
          >
            {inCart ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  )
}
