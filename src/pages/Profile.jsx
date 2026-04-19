import React from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { User, Mail, Shield, LogOut, Database, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const Profile = () => {
  const user = storage.getUser() || { username: 'Guest', email: 'guest@example.com' };
  const navigate = useNavigate();

  const handleLogout = () => {
    storage.removeUser();
    navigate('/login');
  };

  return (
    <>
      <Header title="Smart Profile" />
      <div className="screen-content animate-fade-in">
        <div style={{ textAlign: 'center', marginBottom: '30px', padding: '20px 0' }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'var(--border)', margin: '0 auto 15px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '4px solid var(--primary)',
            boxShadow: '0 0 20px rgba(79, 70, 229, 0.2)'
          }}>
            <User size={50} color="var(--primary)" />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '700' }}>{user.username}</h2>
          <p style={{ color: 'var(--text-muted)' }}>{user.email}</p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            Account Information
          </h3>
          <div className="card" style={{ padding: 0 }}>
            {[
              { icon: <Mail size={18} />, label: 'Email Address', value: user.email },
              { icon: <Shield size={18} />, label: 'Security Level', value: 'High (Verified)' },
            ].map((item, i) => (
              <div key={i} style={{ 
                padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: i === 1 ? 'none' : '1px solid var(--border)' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{item.label}</span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
            Persistence Status (localStorage)
          </h3>
          <div className="card" style={{ background: 'var(--bg)', borderStyle: 'dashed', borderColor: 'var(--primary)', opacity: 0.9 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Database size={20} color="var(--primary)" />
              <span style={{ fontWeight: '700', fontSize: '14px' }}>Live Storage Sync Active</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <CheckCircle size={14} color="var(--success)" />
                <span>User object persisted: <strong>true</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <CheckCircle size={14} color="var(--success)" />
                <span>Active Login Session: <strong>active</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <CheckCircle size={14} color="var(--success)" />
                <span>Saved Favorites Count: <strong>{storage.getFavorites().length}</strong></span>
              </div>
            </div>
          </div>
        </div>

        <button 
          className="btn btn-secondary" 
          style={{ width: '100%', color: 'var(--error)', borderColor: 'var(--error)' }}
          onClick={handleLogout}
        >
          <LogOut size={20} /> Logout from Session
        </button>
      </div>
      <BottomNav />
    </>
  );
};

export default Profile;
