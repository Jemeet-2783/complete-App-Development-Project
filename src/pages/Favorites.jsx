import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { Heart, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorites(storage.getFavorites());
  }, []);

  const removeFav = (e, post) => {
    e.stopPropagation();
    const updated = storage.toggleFavorite(post);
    setFavorites(updated);
  };

  return (
    <>
      <Header title="My Favorites" />
      <div className="screen-content animate-fade-in">
        {favorites.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <Heart size={64} color="var(--border)" style={{ marginBottom: '20px' }} />
            <h2>No Favorites Yet</h2>
            <p>Explore the feed and save items you like!</p>
            <button 
              className="btn btn-primary" 
              style={{ marginTop: '20px' }}
              onClick={() => navigate('/home')}
            >
              Go Exploring
            </button>
          </div>
        ) : (
          favorites.map(post => (
            <div 
              key={post.id} 
              className="card" 
              onClick={() => navigate(`/detail/${post.id}`)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div style={{ maxWidth: '80%' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600' }}>{post.title}</h3>
                <p style={{ fontSize: '13px' }}>Click to read more...</p>
              </div>
              <Trash2 
                size={20} 
                color="var(--error)" 
                style={{ cursor: 'pointer' }}
                onClick={(e) => removeFav(e, post)}
              />
            </div>
          ))
        )}
      </div>
      <BottomNav />
    </>
  );
};

export default Favorites;
