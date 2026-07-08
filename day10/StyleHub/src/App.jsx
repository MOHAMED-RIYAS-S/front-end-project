import { useMemo, useState } from 'react'
import './App.css'

const products = [
  {
    id: 1,
    name: 'Aurora Laptop',
    category: 'Electronics',
    price: 74999,
    oldPrice: 82999,
    rating: 4.8,
    badge: 'Hot Deal',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Pulse Headphones',
    category: 'Electronics',
    price: 3999,
    oldPrice: 5499,
    rating: 4.7,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Metro Sneakers',
    category: 'Fashion',
    price: 2899,
    oldPrice: 3499,
    rating: 4.6,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Classic Watch',
    category: 'Accessories',
    price: 5999,
    oldPrice: 7299,
    rating: 4.9,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Everyday Backpack',
    category: 'Accessories',
    price: 2199,
    oldPrice: 2899,
    rating: 4.5,
    badge: 'Travel Pick',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'Cotton Overshirt',
    category: 'Fashion',
    price: 1699,
    oldPrice: 2399,
    rating: 4.4,
    badge: 'Limited',
    image: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=80',
  },
]

const pages = ['Home', 'Shop', 'Deals', 'About', 'Contact']
const categories = ['All', 'Electronics', 'Fashion', 'Accessories']

function App() {
  const [activePage, setActivePage] = useState('Home')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || product.category === category
      return matchesSearch && matchesCategory
    })
  }, [category, search])

  const featuredProducts = products.slice(0, 3)
  const dealProducts = products.filter((product) => product.oldPrice - product.price > 1000)

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" onClick={() => setActivePage('Home')} type="button">
          <span className="brand-mark">S</span>
          <span>StyleHub</span>
        </button>

        <nav className="nav-links" aria-label="Main navigation">
          {pages.map((page) => (
            <button
              className={activePage === page ? 'active' : ''}
              key={page}
              onClick={() => setActivePage(page)}
              type="button"
            >
              {page}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {activePage === 'Home' && (
          <HomePage featuredProducts={featuredProducts} setActivePage={setActivePage} />
        )}

        {activePage === 'Shop' && (
          <ShopPage
            category={category}
            filteredProducts={filteredProducts}
            search={search}
            setCategory={setCategory}
            setSearch={setSearch}
          />
        )}

        {activePage === 'Deals' && <DealsPage products={dealProducts} setActivePage={setActivePage} />}
        {activePage === 'About' && <AboutPage />}
        {activePage === 'Contact' && <ContactPage />}
      </main>

      <footer className="footer">
        <p>StyleHub keeps the Day 9 catalog idea and turns it into a complete shopping experience.</p>
      </footer>
    </div>
  )
}

function HomePage({ featuredProducts, setActivePage }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Fresh picks for every day</p>
          <h1>StyleHub</h1>
          <p>
            A clean multi-page shopping project with product search, category filters,
            featured deals, and polished responsive layouts.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => setActivePage('Shop')} type="button">
              Shop Products
            </button>
            <button className="secondary-button" onClick={() => setActivePage('Deals')} type="button">
              View Deals
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Featured</p>
          <h2>Trending Products</h2>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="feature-band">
        <div>
          <h2>Multiple pages, one smooth catalog</h2>
          <p>Navigate between screens without losing the clean product-card style from Day 9.</p>
        </div>
        <button className="primary-button" onClick={() => setActivePage('About')} type="button">
          Learn More
        </button>
      </section>
    </>
  )
}

function ShopPage({ category, filteredProducts, search, setCategory, setSearch }) {
  return (
    <section className="section page-section">
      <div className="section-heading">
        <p className="eyebrow">Catalog</p>
        <h1>Shop Products</h1>
      </div>

      <div className="toolbar">
        <input
          aria-label="Search products"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search product..."
          type="search"
          value={search}
        />
        <select
          aria-label="Filter category"
          onChange={(event) => setCategory(event.target.value)}
          value={category}
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>Try another search or choose a different category.</p>
        </div>
      )}
    </section>
  )
}

function DealsPage({ products, setActivePage }) {
  return (
    <section className="section page-section deals-page">
      <div className="section-heading">
        <p className="eyebrow">Offers</p>
        <h1>Today&apos;s Deals</h1>
      </div>
      <div className="offer-banner">
        <h2>Save more on electronics, fashion, and accessories</h2>
        <p>Every card shows original pricing, updated pricing, and a deal badge.</p>
        <button className="primary-button" onClick={() => setActivePage('Shop')} type="button">
          Browse Catalog
        </button>
      </div>
      <ProductGrid products={products} />
    </section>
  )
}

function AboutPage() {
  const highlights = ['React state pages', 'Search and filters', 'Responsive cards', 'Separate style sections']

  return (
    <section className="section page-section split-page">
      <div className="about-panel">
        <p className="eyebrow">About</p>
        <h1>Built from the Day 9 catalog reference</h1>
        <p>
          StyleHub keeps the product catalog foundation and adds more application structure:
          navigation, landing content, deals, contact details, and reusable product cards.
        </p>
      </div>
      <div className="timeline">
        {highlights.map((item, index) => (
          <div className="timeline-item" key={item}>
            <span>{index + 1}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function ContactPage() {
  return (
    <section className="section page-section contact-layout">
      <div className="contact-copy">
        <p className="eyebrow">Contact</p>
        <h1>Talk to StyleHub</h1>
        <p>Use the form layout as a front-end practice screen for customer messages.</p>
        <div className="contact-details">
          <p>Email: hello@stylehub.test</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Chennai, India</p>
        </div>
      </div>

      <form className="contact-form">
        <label>
          Name
          <input placeholder="Your name" type="text" />
        </label>
        <label>
          Email
          <input placeholder="you@example.com" type="email" />
        </label>
        <label>
          Message
          <textarea placeholder="Write your message" rows="5" />
        </label>
        <button className="primary-button" type="button">Send Message</button>
      </form>
    </section>
  )
}

function ProductGrid({ products }) {
  return (
    <div className="products">
      {products.map((product) => (
        <article className="product-card" key={product.id}>
          <div className="product-image">
            <img alt={product.name} src={product.image} />
            <span>{product.badge}</span>
          </div>
          <div className="product-content">
            <p className="category">{product.category}</p>
            <h3>{product.name}</h3>
            <p className="rating">Rating {product.rating}</p>
            <div className="price-row">
              <strong>Rs. {product.price.toLocaleString('en-IN')}</strong>
              <span>Rs. {product.oldPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="card-actions">
              <button className="cart-button" type="button">Add Cart</button>
              <button className="buy-button" type="button">Buy Now</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default App
