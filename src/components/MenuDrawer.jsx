import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Bell, LogOut, X, ChevronRight } from 'lucide-react';
import { storage } from '../utils/storage';

const MenuDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    storage.removeUser();
    onClose();
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '480px',
      height: '100%',
      zIndex: 2000,
      display: 'flex',
      justifyContent: 'flex-end',
      pointerEvents: 'none'
    }}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(3px)',
          pointerEvents: 'auto'
        }}
      />
      
      {/* Drawer Content */}
      <div className="animate-fade-in" style={{
        width: '280px',
        height: '100%',
        background: 'var(--bg-secondary)',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        pointerEvents: 'auto',
        animationDuration: '0.3s'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Menu</h2>
          <X size={24} onClick={onClose} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
            { icon: <Bell size={20} />, label: 'Notifications', path: '/notifications' },
          ].map((item, idx) => (
            <div 
              key={idx}
              onClick={() => { navigate(item.path); onClose(); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px', borderRadius: '12px', cursor: 'pointer',
                background: 'rgba(79, 70, 229, 0.03)', transition: '0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'var(--primary)' }}>{item.icon}</span>
                <span style={{ fontWeight: '500' }}>{item.label}</span>
              </div>
              <ChevronRight size={18} color="var(--text-muted)" />
            </div>
          ))}

          <div style={{ margin: '20px 0', height: '1px', background: 'var(--border)' }} />

          <button 
            onClick={handleLogout}
            style={{
              width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)',
              background: 'rgba(239, 68, 68, 0.05)', color: 'var(--error)', fontWeight: '600',
              display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer'
            }}
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>

        <div style={{ marginTop: 'auto', textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
          Smart Explorer App v1.0.4
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
