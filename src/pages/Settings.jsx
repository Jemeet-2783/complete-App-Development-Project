import React, { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { Moon, Bell, Shield, Info, ChevronRight, Sun, Palette } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const Settings = () => {
  const [settings, setSettings] = useState(storage.getSettings());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
    storage.setSettings(settings);
  }, [settings]);

  const toggleDarkMode = () => {
    setSettings(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const toggleNotifications = () => {
    setSettings(prev => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled }));
    if (!settings.notificationsEnabled) {
      storage.addNotification({ 
        title: 'Alerts Active', 
        message: 'You have enabled push notifications for Smart Explorer.' 
      });
    }
  };

  const SettingRow = ({ icon, label, description, children, onClick }) => (
    <div 
      onClick={onClick}
      style={{ 
        padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)', cursor: onClick ? 'pointer' : 'default',
        background: 'var(--bg-secondary)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '10px', 
          background: 'rgba(79, 70, 229, 0.05)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' 
        }}>
          {icon}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: '600', fontSize: '15px' }}>{label}</span>
          {description && <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{description}</span>}
        </div>
      </div>
      {children}
    </div>
  );

  const Toggle = ({ active, onToggle }) => (
    <div 
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      style={{
        width: '48px', height: '26px', borderRadius: '13px',
        background: active ? 'var(--primary)' : 'var(--border)',
        position: 'relative', cursor: 'pointer', transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: active ? '0 0 10px rgba(79, 70, 229, 0.3)' : 'none'
      }}
    >
      <div style={{
        width: '20px', height: '20px', borderRadius: '50%', background: 'white',
        position: 'absolute', top: '3px', left: active ? '25px' : '3px',
        transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }} />
    </div>
  );

  return (
    <>
      <Header title="Settings" />
      <div className="screen-content animate-fade-in" style={{ background: 'var(--bg)' }}>
        
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '4px' }}>
            Appearance & Experience
          </h3>
          <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <SettingRow 
              icon={settings.darkMode ? <Moon size={20} /> : <Sun size={20} />} 
              label="Dark Mode"
              description="Switch between light and dark themes"
            >
              <Toggle active={settings.darkMode} onToggle={toggleDarkMode} />
            </SettingRow>

            <SettingRow 
              icon={<Bell size={20} />} 
              label="Push Notifications"
              description="Receive alerts about new feed discoveries"
            >
              <Toggle active={settings.notificationsEnabled} onToggle={toggleNotifications} />
            </SettingRow>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '4px' }}>
            Privacy & About
          </h3>
          <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <SettingRow icon={<Shield size={20} />} label="Data Privacy" description="Manage your stored exploration data" onClick={() => alert('Privacy controls enabled.')}>
              <ChevronRight size={18} color="var(--text-muted)" />
            </SettingRow>

            <SettingRow icon={<Info size={20} />} label="App Version" description="Version 1.0.4 - Explorer Premium" onClick={() => alert('Up to date!')}>
              <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700' }}>v1.0.4</span>
            </SettingRow>
          </div>
        </div>

        <div style={{ marginTop: 'auto', padding: '20px 0', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            &copy; 2026 Smart Explorer App. All rights reserved.
          </p>
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Settings;
