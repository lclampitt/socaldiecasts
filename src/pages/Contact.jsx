import './Contact.css'

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact</h1>
      </div>

      <div className="contact-centered container">
        <div className="contact-form">
          <p className="contact-intro">Have a question about a listing or need help with an order? Reach out directly:</p>
          <div className="contact-info-row">
            <span className="contact-info-label">Name</span>
            <span className="contact-info-value">Logan Clampitt</span>
          </div>
          <div className="contact-info-row">
            <span className="contact-info-label">Email</span>
            <a href="mailto:lclampitt44@outlook.com" className="contact-email-link">lclampitt44@outlook.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}
