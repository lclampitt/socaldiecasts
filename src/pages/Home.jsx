import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import './Home.css'

const NEWLY_ADDED = products.slice(0, 4)

const categories = [
  {
    label: 'Raced Wins',
    description: 'Authentic race-winning liveries',
    path: '/products/raced-win',
  },
  {
    label: 'Elite Premier',
    description: 'Detailed interiors & display cases',
    path: '/products/elite-premier',
  },
  {
    label: 'Special Finishes',
    description: 'Liquid color, chrome, galaxy & more',
    path: '/products/special-finish',
  },
]

export default function Home() {
  return (
    <div className="home">
      {/* Newly Added */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Newly Added</h2>
          </div>
          <div className="products-grid">
            {NEWLY_ADDED.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/products" className="btn btn-primary-outline">View All Products →</Link>
          </div>
        </div>
      </section>

      {/* Shop By Category */}
      <section className="section container">
        <div className="section-header">
          <h2>Shop By Category</h2>
        </div>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link to={cat.path} key={cat.label} className="category-card">
              <h3>{cat.label}</h3>
              <p>{cat.description}</p>
              <span className="cat-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
