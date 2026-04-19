import { Home, Heart, User, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={24} />, path: '/home', label: 'Home' },
    { icon: <Heart size={24} />, path: '/favorites', label: 'Favs' },
    { icon: <User size={24} />, path: '/profile', label: 'Profile' },
    { icon: <Settings size={24} />, path: '/settings', label: 'Settings' }
  ];

  return (
    <nav className="glass" style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '480px',
      height: 'var(--nav-height)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 1000,
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-secondary)',
      paddingBottom: '5px'
    }}>
      {navItems.map((item) => (
        <div
          key={item.path}
          onClick={() => navigate(item.path)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: location.pathname === item.path ? 'var(--primary)' : 'var(--text-muted)',
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
        >
          {item.icon}
          <span style={{ fontSize: '11px', fontWeight: '500' }}>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default BottomNav;
