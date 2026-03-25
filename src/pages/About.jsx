import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About SoCal Diecasts</h1>
        <p>Passionate collectors, building the ultimate diecast destination</p>
      </div>

      <div className="about-content container">
        {/* Mission */}
        <section className="about-section about-hero-section">
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
              qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              SoCal Diecasts was founded with a singular goal: to bring the most authentic,
              high-quality NASCAR diecast collectibles directly to fans and collectors across the
              country. We source exclusively from officially licensed manufacturers to ensure
              every piece in our catalog meets the highest standards.
            </p>
          </div>
          <div className="about-image-wrap">
            <img
              src="https://picsum.photos/seed/about1/600/400"
              alt="Diecast collection"
              className="about-image"
            />
          </div>
        </section>

        {/* Values */}
        <section className="about-section">
          <h2>What We Stand For</h2>
          <div className="about-values">
            {[
              {
                icon: '🏎️',
                title: 'Authenticity',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Every product we carry is officially licensed and verified for authenticity.',
              },
              {
                icon: '🔍',
                title: 'Quality',
                desc: 'Ut enim ad minim veniam, quis nostrud exercitation. We inspect every item to ensure it arrives in perfect collector condition.',
              },
              {
                icon: '🤝',
                title: 'Community',
                desc: 'Duis aute irure dolor in reprehenderit in voluptate. We build relationships with collectors who share our passion for the sport.',
              },
              {
                icon: '🚀',
                title: 'Innovation',
                desc: 'Excepteur sint occaecat cupidatat non proident. We constantly expand our catalog with the latest releases and rare finds.',
              },
            ].map(v => (
              <div key={v.title} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="about-section about-story">
          <h2>Our Story</h2>
          <div className="story-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
              et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
              quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
            </p>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
              occaecati cupiditate non provident.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="about-cta">
          <h2>Ready to Start Your Collection?</h2>
          <p>Browse our full catalog of NASCAR diecast collectibles.</p>
          <div className="about-cta-btns">
            <Link to="/products" className="btn btn-primary">Shop Now</Link>
            <Link to="/contact" className="btn btn-outline">Get In Touch</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
