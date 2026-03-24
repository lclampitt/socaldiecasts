import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './AuthModal.css'

export default function AuthModal({ mode, onClose, onSwitch }) {
  const { signIn, signUp } = useAuth()
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (mode === 'login') {
      const { error } = await signIn(form.email, form.password)
      if (error) setError(error.message)
      else onClose()
    } else {
      const { error } = await signUp(form.email, form.password, form.firstName, form.lastName)
      if (error) setError(error.message)
      else setSuccess('Account created! Check your email to confirm, then log in.')
    }
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="auth-header">
          <div className="auth-logo">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="6" fill="#f0a500"/>
              <path d="M6 22l6-10 4 6 3-4 5 8H6z" fill="#0f2238"/>
            </svg>
          </div>
          <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{mode === 'login' ? 'Sign in to your SoCal Diecasts account' : 'Join the SoCal Diecasts community'}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="form-row-2">
              <div className="form-group">
                <label>First Name</label>
                <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="John" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="Smith" />
              </div>
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="••••••••" minLength={6} />
          </div>
          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          {mode === 'login' ? (
            <>Don't have an account? <button onClick={() => onSwitch('register')}>Register</button></>
          ) : (
            <>Already have an account? <button onClick={() => onSwitch('login')}>Sign In</button></>
          )}
        </div>
      </div>
    </div>
  )
}
