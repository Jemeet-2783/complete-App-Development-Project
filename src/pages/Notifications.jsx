import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Bell, Info, CheckCircle, ArrowLeft, Send, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setNotifications(storage.getNotifications());
  }, []);

  const triggerTestNotification = () => {
    const newNote = {
      title: 'Alert Triggered',
      message: 'New notification received! Your Smart Explorer is active.',
    };
    storage.addNotification(newNote);
    setNotifications(storage.getNotifications());
    
    // Show visual toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <header className="glass" style={{
        position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '480px', height: 'var(--header-height)',
        display: 'flex', alignItems: 'center', padding: '0 20px', zIndex: 1000,
        background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)',
        opacity: 0.98
      }}>
        <div 
          onClick={() => navigate(-1)} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--primary)' }}
        >
          <ArrowLeft size={22} />
          <span style={{ fontWeight: '600' }}>Back</span>
        </div>
      </header>

      <div className="screen-content animate-fade-in" style={{ paddingBottom: '30px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--primary), #6366f1)',
          padding: '24px',
          borderRadius: 'var(--radius)',
          color: 'white',
          marginBottom: '24px',
          boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Zap size={28} />
            <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>System Tester</h2>
          </div>
          <p style={{ fontSize: '14px', marginBottom: '20px', opacity: 0.9 }}>
            Use the button below to simulate a real-time push notification.
          </p>
          <button 
            className="btn btn-secondary" 
            onClick={triggerTestNotification}
            style={{ 
              background: 'white', border: 'none', color: 'var(--primary)', 
              fontWeight: '700', padding: '12px', fontSize: '14px' 
            }}
          >
            <Send size={18} /> Trigger Test Notification
          </button>
        </div>

        <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
          Recent Activity
        </h3>

        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Bell size={64} color="var(--border)" style={{ opacity: 0.5, marginBottom: '20px' }} />
            <h2 style={{ fontSize: '18px' }}>All Caught Up!</h2>
            <p>You have no new notifications.</p>
          </div>
        ) : (
          notifications.map(note => (
            <div key={note.id} className="card" style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{
                padding: '10px', background: 'rgba(79, 70, 229, 0.1)', 
                borderRadius: '12px', color: 'var(--primary)'
              }}>
                <CheckCircle size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px', color: 'var(--text)' }}>{note.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{note.message}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>
                    {new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--primary)',
          padding: '12px 24px',
          borderRadius: '30px',
          zIndex: 3000,
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <Zap size={20} color="var(--primary)" fill="var(--primary)" />
          <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--primary)' }}>
            New notification received!
          </span>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </>
  );
};

export default Notifications;
