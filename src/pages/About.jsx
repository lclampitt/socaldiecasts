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
        {/* About Me */}
        <section className="about-section about-hero-section">
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              Hi, I'm Logan Clampitt — a NASCAR fan and diecast collector based in Southern California. I started SoCal Diecasts to share my passion for the sport with other collectors and fans.
            </p>
            <p>
              I source only officially licensed diecast cars from trusted manufacturers, so you can be confident every piece you receive is the real deal. Whether you're a lifelong collector or just starting out, I'm here to help you find exactly what you're looking for.
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
