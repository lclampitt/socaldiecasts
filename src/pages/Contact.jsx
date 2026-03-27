import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    try {
      const res = await fetch('https://formspree.io/f/xaqlngnr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact-page">
        <div className="page-header">
          <h1>Contact</h1>
        </div>
        <div className="contact-centered container">
          <div className="contact-success">
            <div className="success-icon">✓</div>
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. I'll get back to you as soon as I can.</p>
            <button className="btn btn-primary" onClick={() => setStatus('idle')}>Send Another</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact</h1>
      </div>

      <div className="contact-centered container">
        <div className="contact-form">
          <p className="contact-intro">Have a question about a listing or need help with an order? Send me a message below.</p>

          {status === 'error' && (
            <div className="contact-error">Something went wrong. Please try again or email lclampitt44@outlook.com directly.</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                className="form-input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-input form-textarea"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What can I help you with?"
                rows={5}
                required
              />
            </div>
            <button
              className="btn btn-primary contact-submit"
              type="submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
