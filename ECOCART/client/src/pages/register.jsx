// src/pages/Register.jsx
import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullname, email, password, confirm } = form;
    if (!fullname || !email || !password || !confirm) {
      return setError('All fields are required.');
    }
    if (password !== confirm) {
      return setError('Passwords do not match.');
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed.');

      setMsg('🎉 Registered successfully! You can now log in.');
      setForm({ fullname: '', email: '', password: '', confirm: '' });
      window.location.href = '/login';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card shadow">
        <h2 className="text-success text-center mb-4">Create Your Ecomart Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              name="fullname"
              placeholder="Full Name"
              value={form.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              name="confirm"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="text-danger mb-3 fw-semibold">{error}</div>}
          {msg && <div className="text-success mb-3 fw-semibold">{msg}</div>}

          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <p className="text-center mt-3 text-muted">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
