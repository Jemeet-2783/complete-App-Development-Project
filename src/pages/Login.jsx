import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { storage } from '../utils/storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!email.trim() || !password.trim()) {
      setError('Please provide both email and password.');
      return;
    }

    // Check credentials against localStorage
    const savedUser = storage.getUser();
    
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      // Success: mark as logged in and redirect
      storage.setUser({ ...savedUser, isLoggedIn: true });
      navigate('/home');
    } else {
      // Error message for mismatched credentials
      setError('Invalid email or password. Please try again.');
    }
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
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Welcome Back</h1>
        <p style={{ color: 'var(--text-muted)' }}>Sign in to continue exploring</p>
      </div>

      <div className="card" style={{ padding: '30px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="alex@example.com" 
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              style={{ borderColor: error && !email ? 'var(--error)' : 'var(--border)' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              style={{ borderColor: error && !password ? 'var(--error)' : 'var(--border)' }}
            />
          </div>

          {error && (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              color: 'var(--error)', 
              padding: '12px', 
              borderRadius: '8px', 
              fontSize: '14px', 
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: '500',
              border: '1px solid rgba(239, 68, 68, 0.1)'
            }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: '16px' }}>
            Login
          </button>
        </form>
      </div>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '15px' }}>
        Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
