import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { storage } from '../utils/storage';
import { Heart, ChevronRight, Activity, RefreshCw } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState(storage.getFavorites());
  const navigate = useNavigate();

  const fetchPosts = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    
    try {
      const data = await apiService.getPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleToggleFavorite = (e, post) => {
    e.stopPropagation();
    const updated = storage.toggleFavorite(post);
    setFavorites(updated);
  };

  const isFav = (id) => favorites.some(f => f.id === id);

  return (
    <>
      <Header title="Smart Explorer" />
      
      <div className="screen-content animate-fade-in" style={{ background: 'var(--bg)' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '24px',
          background: 'rgba(79, 70, 229, 0.05)',
          padding: '16px',
          borderRadius: 'var(--radius)',
          borderLeft: '4px solid var(--primary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Activity size={24} color="var(--primary)" />
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '2px' }}>Latest Discoveries</h2>
              <p style={{ fontSize: '13px' }}>Live API Feed Integration</p>
            </div>
          </div>
          <button 
            onClick={() => fetchPosts(true)}
            disabled={refreshing || loading}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', 
              color: 'var(--primary)', opacity: (refreshing || loading) ? 0.5 : 1,
              animation: refreshing ? 'spin 1s linear infinite' : 'none'
            }}
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="spinner" style={{ 
              width: '40px', height: '40px', 
              border: '3px solid var(--border)', 
              borderTopColor: 'var(--primary)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <p style={{ marginTop: '16px', fontWeight: '500', color: 'var(--text-muted)' }}>Fetching live content...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px', opacity: refreshing ? 0.6 : 1, transition: 'opacity 0.2s' }}>
            {posts.map(post => (
              <div 
                key={post.id} 
                className="card" 
                onClick={() => navigate(`/detail/${post.id}`)}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '10px', 
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text)', lineHeight: '1.4' }}>
                    {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                  </h3>
                  <div 
                    onClick={(e) => handleToggleFavorite(e, post)}
                    style={{ 
                      padding: '8px', 
                      borderRadius: '50%', 
                      background: isFav(post.id) ? 'rgba(239, 68, 68, 0.1)' : 'rgba(100, 116, 139, 0.05)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Heart 
                      size={18} 
                      fill={isFav(post.id) ? 'var(--error)' : 'none'} 
                      color={isFav(post.id) ? 'var(--error)' : 'var(--text-muted)'}
                    />
                  </div>
                </div>
                
                <p style={{ 
                  fontSize: '14px', 
                  color: 'var(--text-muted)',
                  display: '-webkit-box', 
                  WebkitLineClamp: 2, 
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: '1.5'
                }}>
                  {post.body}
                </p>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  alignItems: 'center', 
                  marginTop: '4px',
                  color: 'var(--primary)',
                  fontWeight: '600',
                  fontSize: '13px'
                }}>
                  <span>Read more</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

export default Home;
