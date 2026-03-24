// Temporary product data - replace with Supabase DB calls
export const PRODUCTS = [
  // All Diecast - general
  {
    id: 1,
    title: "Kyle Larson 2024 HendrickCars.com Chevy 1:24 Diecast",
    driver: "Kyle Larson",
    price: 79.99,
    category: "All Diecast",
    sku: "KL5-2024-124",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=300&fit=crop",
    inStock: true,
    description: "1:24 scale die-cast replica of Kyle Larson's #5 HendrickCars.com Chevrolet."
  },
  {
    id: 2,
    title: "Chase Elliott 2024 NAPA Auto Parts Chevy 1:24 Diecast",
    driver: "Chase Elliott",
    price: 79.99,
    category: "All Diecast",
    sku: "CE9-2024-124",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=300&fit=crop",
    inStock: true,
    description: "1:24 scale die-cast replica of Chase Elliott's #9 NAPA Auto Parts Chevrolet."
  },
  {
    id: 3,
    title: "Denny Hamlin 2024 FedEx Express Toyota 1:24 Diecast",
    driver: "Denny Hamlin",
    price: 74.99,
    category: "All Diecast",
    sku: "DH11-2024-124",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    inStock: true,
    description: "1:24 scale die-cast of Denny Hamlin's #11 FedEx Express Toyota Camry."
  },
  {
    id: 4,
    title: "Martin Truex Jr. 2024 Bass Pro Shops Toyota 1:64 Diecast",
    driver: "Martin Truex Jr.",
    price: 12.99,
    category: "All Diecast",
    sku: "MT19-2024-164",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=300&fit=crop",
    inStock: true,
    description: "1:64 scale die-cast of Martin Truex Jr.'s #19 Bass Pro Shops Toyota."
  },
  {
    id: 5,
    title: "Ryan Blaney 2024 BodyArmor Ford 1:24 Diecast",
    driver: "Ryan Blaney",
    price: 74.99,
    category: "All Diecast",
    sku: "RB12-2024-124",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=300&fit=crop",
    inStock: true,
    description: "1:24 scale die-cast of Ryan Blaney's #12 BodyArmor Ford Mustang."
  },
  {
    id: 6,
    title: "Joey Logano 2024 Shell Pennzoil Ford 1:24 Diecast",
    driver: "Joey Logano",
    price: 74.99,
    category: "All Diecast",
    sku: "JL22-2024-124",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    inStock: true,
    description: "1:24 scale die-cast of Joey Logano's #22 Shell Pennzoil Ford."
  },

  // Raced Wins
  {
    id: 7,
    title: "Kyle Larson 2024 Nashville Raced Win 1:24 Diecast",
    driver: "Kyle Larson",
    price: 109.99,
    category: "Raced Win",
    sku: "KL5-2024-NASH-RW",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=300&fit=crop",
    inStock: true,
    description: "Authentic raced win replica from Kyle Larson's 2024 Nashville victory."
  },
  {
    id: 8,
    title: "Chase Elliott 2024 Talladega Raced Win 1:24 Diecast",
    driver: "Chase Elliott",
    price: 109.99,
    category: "Raced Win",
    sku: "CE9-2024-TALA-RW",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=300&fit=crop",
    inStock: true,
    description: "Authentic raced win replica from Chase Elliott's Talladega triumph."
  },
  {
    id: 9,
    title: "Denny Hamlin 2024 Daytona 500 Raced Win 1:24 Diecast",
    driver: "Denny Hamlin",
    price: 129.99,
    category: "Raced Win",
    sku: "DH11-2024-D500-RW",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    inStock: true,
    description: "Daytona 500 raced win replica — one of the most coveted in the hobby."
  },
  {
    id: 10,
    title: "Christopher Bell 2024 Bristol Raced Win 1:24 Diecast",
    driver: "Christopher Bell",
    price: 109.99,
    category: "Raced Win",
    sku: "CB20-2024-BRIS-RW",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=300&fit=crop",
    inStock: true,
    description: "Christopher Bell's Bristol Night Race raced win die-cast."
  },

  // Elite Premier
  {
    id: 11,
    title: "Kyle Larson 2024 HendrickCars.com Elite Premier Edition 1:24",
    driver: "Kyle Larson",
    price: 169.99,
    category: "Elite Premier",
    sku: "KL5-2024-EP",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=300&fit=crop",
    inStock: true,
    description: "Elite Premier Edition with opening hood, trunk, opening doors, real rubber tires, and detailed engine."
  },
  {
    id: 12,
    title: "Chase Elliott 2024 NAPA Elite Premier Edition 1:24",
    driver: "Chase Elliott",
    price: 169.99,
    category: "Elite Premier",
    sku: "CE9-2024-EP",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    inStock: true,
    description: "Elite Premier Edition with full detail, real rubber tires, and opening panels."
  },
  {
    id: 13,
    title: "Ryan Blaney 2024 BodyArmor Elite Premier Edition 1:24",
    driver: "Ryan Blaney",
    price: 159.99,
    category: "Elite Premier",
    sku: "RB12-2024-EP",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=300&fit=crop",
    inStock: true,
    description: "Elite Premier Edition with real rubber tires and detailed interior."
  },

  // Special Finishes
  {
    id: 14,
    title: "Kyle Larson 2024 Galaxy Color Chrome 1:24 Diecast",
    driver: "Kyle Larson",
    price: 119.99,
    category: "Special Finish",
    sku: "KL5-2024-GCC",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=300&fit=crop",
    inStock: true,
    description: "Stunning galaxy color chrome special finish — a must-have for any Larson fan."
  },
  {
    id: 15,
    title: "Chase Elliott 2024 Liquid Color 1:24 Diecast",
    driver: "Chase Elliott",
    price: 109.99,
    category: "Special Finish",
    sku: "CE9-2024-LC",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    inStock: true,
    description: "Breathtaking liquid color finish on Chase Elliott's iconic #9."
  },
  {
    id: 16,
    title: "Denny Hamlin 2024 Raw Metal Finish 1:24 Diecast",
    driver: "Denny Hamlin",
    price: 99.99,
    category: "Special Finish",
    sku: "DH11-2024-RAW",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=300&fit=crop",
    inStock: true,
    description: "Raw metal finish showing the die-cast in its unpainted form — collector's item."
  },
  {
    id: 17,
    title: "Ryan Blaney 2024 Flashcoat Color 1:24 Diecast",
    driver: "Ryan Blaney",
    price: 109.99,
    category: "Special Finish",
    sku: "RB12-2024-FC",
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=300&fit=crop",
    inStock: true,
    description: "Flashcoat color special finish adds dimension and shimmer."
  },
  {
    id: 18,
    title: "Joey Logano 2024 Color Chrome Shell Pennzoil 1:24 Diecast",
    driver: "Joey Logano",
    price: 114.99,
    category: "Special Finish",
    sku: "JL22-2024-CC",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    inStock: true,
    description: "Color chrome Shell Pennzoil scheme on Joey Logano's #22."
  },
]

export const DRIVERS = [
  "AJ Allmendinger", "Alex Bowman", "Austin Cindric", "Austin Dillon",
  "Brad Keselowski", "Bubba Wallace", "Carson Hocevar", "Chase Briscoe",
  "Chase Elliott", "Christopher Bell", "Cole Custer", "Daniel Suarez",
  "Denny Hamlin", "Erik Jones", "Harrison Burton", "Joey Logano",
  "Josh Berry", "Kyle Busch", "Kyle Larson", "Martin Truex Jr.",
  "Michael McDowell", "Noah Gragson", "Richard Petty", "Ross Chastain",
  "Ryan Blaney", "Tyler Reddick", "William Byron", "Zane Smith"
]

export function filterProducts(products, filter) {
  if (!filter || filter === 'all') return products

  if (filter === 'raced-wins') {
    return products.filter(p =>
      p.title.toLowerCase().includes('raced win') ||
      p.category === 'Raced Win'
    )
  }

  if (filter === 'elite-premier') {
    return products.filter(p =>
      p.title.toLowerCase().includes('elite premier') ||
      p.category === 'Elite Premier'
    )
  }

  if (filter === 'special-finishes') {
    const keywords = ['liquid color', 'color chrome', 'raw', 'galaxy', 'flashcoat']
    return products.filter(p =>
      keywords.some(k => p.title.toLowerCase().includes(k)) ||
      p.category === 'Special Finish'
    )
  }

  return products
}

export function searchProducts(products, query) {
  if (!query) return products
  const q = query.toLowerCase()
  return products.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.driver.toLowerCase().includes(q) ||
    p.sku.toLowerCase().includes(q)
  )
}
