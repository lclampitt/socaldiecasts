import { useNavigate } from 'react-router-dom'
import { drivers, products } from '../data/products'
import './ShopByDriver.css'

export default function ShopByDriver() {
  const navigate = useNavigate()

  function getCount(name) {
    if (name === 'Other Drivers') return null
    return products.filter(p =>
      p.driver.toLowerCase().includes(name.toLowerCase())
    ).length
  }

  return (
    <div className="driver-page">
      <div className="page-header">
        <div className="container">
          <h1>Shop By Driver</h1>
        </div>
      </div>

      <div className="container">
        <div className="driver-name-grid">
          {drivers.map(name => {
            const count = getCount(name)
            return (
              <button
                key={name}
                className="driver-name-btn"
                onClick={() => navigate(`/shop-by-driver/${encodeURIComponent(name)}`)}
              >
                {name}{count !== null ? <span className="driver-stock-count"> ({count})</span> : ''}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
