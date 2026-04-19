import React, { useState } from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MenuDrawer from './MenuDrawer';

const Header = ({ title, showMenu = true }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="glass" style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        zIndex: 1000,
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        opacity: 0.95
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => navigate('/home')}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--primary)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)'
          }}>S</div>
          <span style={{ fontWeight: '700', fontSize: '18px', color: 'var(--text)' }}>{title || "Explorer"}</span>
        </div>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <Bell size={22} style={{ cursor: 'pointer', color: 'var(--text)' }} onClick={() => navigate('/notifications')} />
          {showMenu && (
            <Menu 
              size={22} 
              style={{ cursor: 'pointer', color: 'var(--text)' }} 
              onClick={() => setIsMenuOpen(true)} 
            />
          )}
        </div>
      </header>

      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
