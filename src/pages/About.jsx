import React from 'react'
import './About.css'

export default function About() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1>About Us</h1>
          <p>Southern California's premier NASCAR die-cast dealer</p>
        </div>
      </div>

      <div className="container about-layout">
        <div className="about-main">
          <section className="about-section">
            <h2>Our Story</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
            </p>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.
            </p>
          </section>

          <section className="about-section">
            <h2>Why SoCal Diecasts?</h2>
            <div className="about-pillars">
              {[
                { icon: '🏎️', title: 'Authentic Products', body: 'All products are officially licensed NASCAR die-casts sourced directly from manufacturers like Lionel Racing.' },
                { icon: '📦', title: 'Fast Shipping', body: 'Orders ship within 1–2 business days from our Southern California warehouse. Free shipping on orders over $75.' },
                { icon: '🛡️', title: 'Collector Guarantee', body: 'Every die-cast arrives in original manufacturer packaging, undamaged and ready for display or investment.' },
                { icon: '🤝', title: 'Community First', body: 'We are collectors ourselves. We understand what you care about and treat every order like it is our own collection.' },
              ].map(p => (
                <div key={p.title} className="about-pillar">
                  <div className="pillar-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="about-sidebar">
          <div className="about-card">
            <h3>Quick Facts</h3>
            <ul className="about-facts">
              <li><span>Location</span><strong>Southern California</strong></li>
              <li><span>Products</span><strong>18+ SKUs</strong></li>
              <li><span>Drivers</span><strong>28+ Covered</strong></li>
              <li><span>Shipping</span><strong>1–2 Business Days</strong></li>
              <li><span>Free Shipping</span><strong>Orders $75+</strong></li>
            </ul>
          </div>
          <div className="about-card about-contact-card">
            <h3>Get in Touch</h3>
            <p>Have a question about a product or your order? We'd love to hear from you.</p>
            <a href="/contact" className="btn-primary" style={{ marginTop: 14, display: 'inline-flex', justifyContent: 'center' }}>
              Contact Us
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
