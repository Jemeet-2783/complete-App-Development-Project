import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storage } from '../utils/storage';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Store user data in localStorage
    storage.setUser({
      username: formData.username,
      email: formData.email,
      password: formData.password
    });

    // Add a welcome notification
    storage.addNotification({
      title: 'Registration Successful',
      message: `Welcome to Smart Explorer, ${formData.username}!`
    });

    // Navigate to login
    navigate('/login');
  };

  return (
    <div className="screen-content animate-fade-in" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '90vh',
      maxWidth: '400px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'var(--primary)',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '28px',
          fontWeight: 'bold',
          margin: '0 auto 20px',
          boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.4)'
        }}>S</div>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Create Account</h1>
        <p style={{ color: 'var(--text-muted)' }}>Start your journey with Smart Explorer</p>
      </div>

      <div className="card" style={{ padding: '30px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05), 0 10px 10px -5px rgba(0,0,0,0.01)' }}>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              style={{ borderColor: errors.username ? 'var(--error)' : 'var(--border)' }}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="e.g. user@example.com"
              value={formData.email}
              onChange={handleChange}
              style={{ borderColor: errors.email ? 'var(--error)' : 'var(--border)' }}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={handleChange}
              style={{ borderColor: errors.password ? 'var(--error)' : 'var(--border)' }}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: '16px' }}>
            Sign Up
          </button>
        </form>
      </div>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '15px' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Log In</Link>
      </p>
    </div>
  );
};

export default Signup;
