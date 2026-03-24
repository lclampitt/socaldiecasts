import React, { useState } from 'react'
import './Contact.css'

// Uses EmailJS - sign up at emailjs.com and configure to forward to logannc44@yahoo.com
// Set env vars: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', message: ''
  })
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    try {
      // EmailJS integration
      // Install: npm install @emailjs/browser
      // Then import emailjs from '@emailjs/browser'
      // And uncomment the block below:

      /*
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: `${form.firstName} ${form.lastName}`,
          from_email: form.email,
          message: form.message,
          to_email: 'logannc44@yahoo.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      */

      // Simulate success for now
      await new Promise(r => setTimeout(r, 1200))
      setStatus('success')
      setForm({ firstName: '', lastName: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Have a question? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="container contact-layout">
        <div className="contact-form-wrap">
          <h2>Send Us a Message</h2>
          <p className="contact-sub">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>

          {status === 'success' && (
            <div className="contact-success">
              ✅ Message sent! We'll be in touch soon.
            </div>
          )}
          {status === 'error' && (
            <div className="contact-error">
              ❌ Something went wrong. Please try again or email us directly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row-2">
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="firstName" value={form.firstName} onChange={handleChange}
                  required placeholder="John"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="lastName" value={form.lastName} onChange={handleChange}
                  required placeholder="Smith"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                name="email" type="email" value={form.email} onChange={handleChange}
                required placeholder="you@example.com"
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message" value={form.message} onChange={handleChange}
                required placeholder="Type your message here..."
                rows={6}
              />
            </div>
            <button type="submit" className="btn-primary contact-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <aside className="contact-info">
          <div className="contact-card">
            <div className="contact-card-icon">📧</div>
            <h3>Email</h3>
            <p>logannc44@yahoo.com</p>
          </div>
          <div className="contact-card">
            <div className="contact-card-icon">📍</div>
            <h3>Location</h3>
            <p>Southern California, USA</p>
          </div>
          <div className="contact-card">
            <div className="contact-card-icon">⏰</div>
            <h3>Response Time</h3>
            <p>We typically respond within 24–48 hours on business days.</p>
          </div>
          <div className="contact-card">
            <div className="contact-card-icon">📦</div>
            <h3>Order Questions</h3>
            <p>For order tracking, please use our <a href="/track-order">Track Order</a> page.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
