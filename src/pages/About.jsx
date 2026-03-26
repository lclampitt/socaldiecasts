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
              Hi! My name is Logan Clampitt and I'm the proud owner of SoCal Diecasts, located in Southern California. I've been collecting diecasts since 2019 and it's grown into a big passion of mine. I first became a NASCAR fan when my dad and I went to my first race at Auto Club Speedway. I was always a Dale Earnhardt Jr. fan growing up and now I just enjoy watching the racing.
            </p>
            <p>
              I also have a professional sim racing background spanning 10 years. I started iRacing in 2013 and slowly climbed through the ranks, becoming a professional in 2016 in the eNASCAR Coca-Cola iRacing Series through 2024. I scored two runner-up championships, 3 wins, and several top 5s throughout my time in the series. Once I started college, I also competed in the eNASCAR College iRacing Series and was able to rack up $30k+ in scholarship winnings, earning two championships, two runner-ups, and multiple wins.
            </p>
            <p>
              I currently offer diecasts I've owned over the years along with special finish pieces and extras from my personal collection. Shipping is free, and you'll receive a confirmation email once your order is placed. A tracking number will be provided within 1–3 days and you can check back anytime using your order number. Thanks for stopping by and reading!
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
