import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import { storage } from '../utils/storage';
import { ArrowLeft, Heart, MessageSquare, Share2, Bookmark } from 'lucide-react';
import Header from '../components/Header';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, commentsData] = await Promise.all([
          apiService.getPostDetails(id),
          apiService.getComments(id)
        ]);
        setPost(postData);
        setComments(commentsData);
        setIsFavorite(storage.isFavorite(Number(id)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const toggleFav = () => {
    storage.toggleFavorite(post);
    setIsFavorite(!isFavorite);
  };

  if (loading) return (
    <div className="screen-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="spinner" style={{ 
        width: '40px', height: '40px', border: '3px solid var(--border)', 
        borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' 
      }}></div>
    </div>
  );

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

      <div className="screen-content animate-fade-in" style={{ paddingBottom: '120px' }}>
        <div style={{
          width: '100%', height: '240px', 
          background: 'linear-gradient(45deg, var(--primary), #818cf8, #a78bfa)',
          borderRadius: 'var(--radius)', marginBottom: '24px', position: 'relative',
          overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Bookmark size={80} color="rgba(255,255,255,0.2)" />
          <div style={{ 
            position: 'absolute', bottom: '16px', left: '16px', 
            background: 'rgba(255,255,255,0.2)', padding: '6px 12px', 
            borderRadius: '20px', backdropFilter: 'blur(8px)',
            color: 'white', fontSize: '12px', fontWeight: '600'
          }}>
            Post Category: General
          </div>
        </div>

        <h1 style={{ fontSize: '24px', lineHeight: '1.3', marginBottom: '16px' }}>{post?.title}</h1>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '14px' }}>
            <MessageSquare size={18} /> <span>{comments.length} Comments</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '14px' }}>
            <Activity size={18} color="var(--primary)" /> <span>Trending Now</span>
          </div>
        </div>

        <p style={{ fontSize: '16px', color: 'var(--text)', lineHeight: '1.7', marginBottom: '40px' }}>
          {post?.body}
        </p>

        <section>
          <h2 style={{ fontSize: '20px', borderBottom: '2px solid var(--border)', paddingBottom: '12px', marginBottom: '20px' }}>
            Community Discussion
          </h2>
          {comments.map(comment => (
            <div key={comment.id} style={{ 
              padding: '16px', background: 'var(--bg-secondary)', 
              marginBottom: '16px', borderRadius: 'var(--radius)',
              border: '1px solid var(--border)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                  {comment.name[0].toUpperCase()}
                </div>
                <span style={{ fontWeight: '600', fontSize: '14px' }}>{comment.name}</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{comment.body}</p>
            </div>
          ))}
        </section>
      </div>

      <div className="glass" style={{
        position: 'fixed', bottom: '0', left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '480px', padding: '20px', zIndex: 1000,
        background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)',
        display: 'flex', gap: '12px'
      }}>
        <button 
          className="btn btn-secondary" 
          onClick={toggleFav}
          style={{ 
            flex: 1, 
            borderColor: isFavorite ? 'var(--error)' : 'var(--border)',
            color: isFavorite ? 'var(--error)' : 'var(--text)'
          }}
        >
          <Heart size={20} fill={isFavorite ? 'var(--error)' : 'none'} />
          {isFavorite ? 'In Favorites' : 'Add to Favorites'}
        </button>
        <button className="btn btn-primary" onClick={() => alert('Shared!')} style={{ flex: 1 }}>
          <Share2 size={20} /> Share Now
        </button>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

export default Detail;
