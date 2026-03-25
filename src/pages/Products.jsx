import { useState, useMemo } from 'react'
import { useParams, useSearchParams, useLocation } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import './Products.css'

const FILTER_CONFIG = {
  'raced-win': {
    label: 'Raced Wins',
    test: p => p.category === 'raced-win',
  },
  'elite-premier': {
    label: 'Elite Premier Editions',
    test: p => p.category === 'elite-premier',
  },
'special-finish': {
    label: 'Special Finishes',
    test: p => p.category === 'special-finish',
  },
}

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
]

export default function Products() {
  const { filter } = useParams()
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const searchQuery = searchParams.get('search') || ''

  // Driver filter from path /shop-by-driver/:driver
  const driverParam = location.pathname.startsWith('/shop-by-driver/')
    ? decodeURIComponent(location.pathname.split('/shop-by-driver/')[1])
    : null

  const [sort, setSort] = useState('default')
  const [activeCategory, setActiveCategory] = useState(filter || 'all')
  const [priceFilters, setPriceFilters] = useState([])

  const PRICE_RANGES = [
    { label: 'Under $90',  test: p => p.price < 90 },
    { label: '$90–$110',   test: p => p.price >= 90 && p.price <= 110 },
    { label: '$110+',      test: p => p.price > 110 },
  ]

  function togglePrice(label) {
    setPriceFilters(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    )
  }

  const filtered = useMemo(() => {
    let result = [...products]

    // Driver filter
    if (driverParam) {
      result = result.filter(p =>
        p.driver.toLowerCase().includes(driverParam.toLowerCase())
      )
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.driver.toLowerCase().includes(q)
      )
    }

    // Category filter (url param or sidebar)
    const cat = filter || (activeCategory !== 'all' ? activeCategory : null)
    if (cat && FILTER_CONFIG[cat]) {
      result = result.filter(FILTER_CONFIG[cat].test)
    }

    // Price range filter
    if (priceFilters.length > 0) {
      const matchers = PRICE_RANGES.filter(r => priceFilters.includes(r.label))
      result = result.filter(p => matchers.some(r => r.test(p)))
    }

    // Sort
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sort === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name))

    return result
  }, [filter, activeCategory, sort, searchQuery, driverParam, priceFilters])

  const pageTitle = driverParam
    ? `${driverParam} Diecasts`
    : searchQuery
    ? `Search: "${searchQuery}"`
    : filter && FILTER_CONFIG[filter]
    ? FILTER_CONFIG[filter].label
    : 'All Diecasts'

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>{pageTitle}</h1>
        <p>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
      </div>

      <div className={`products-layout container${(!driverParam && !searchQuery) ? '' : ' products-layout--full'}`}>
        {/* Sidebar */}
        {!driverParam && !searchQuery && (
          <aside className="products-sidebar">
            <div className="sidebar-section">
              <h3>Category</h3>
              <button
                className={`sidebar-filter ${(filter || activeCategory) === 'all' || (!filter && activeCategory === 'all') ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                All Diecasts
                <span className="filter-count">{products.length}</span>
              </button>
              {Object.entries(FILTER_CONFIG).map(([key, cfg]) => (
                <button
                  key={key}
                  className={`sidebar-filter ${(filter || activeCategory) === key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(key)}
                >
                  {cfg.label}
                  <span className="filter-count">{products.filter(cfg.test).length}</span>
                </button>
              ))}
            </div>

            <div className="sidebar-section">
              <h3>Price Range</h3>
              <div className="price-ranges">
                {PRICE_RANGES.map(r => (
                  <label key={r.label} className="price-label">
                    <input
                      type="checkbox"
                      checked={priceFilters.includes(r.label)}
                      onChange={() => togglePrice(r.label)}
                    />
                    {r.label}
                  </label>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Main */}
        <div className="products-main">
          <div className="products-toolbar">
            <span className="results-count">
              Showing <strong>{filtered.length}</strong> results
            </span>
            <div className="sort-wrap">
              <label>Sort by:</label>
              <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="no-results">
              <p>No products found.</p>
            </div>
          ) : (
            <div className="products-grid-main">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
