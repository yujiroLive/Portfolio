import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LightRays from '../ReactBits/LightRays';
import './PostWall.scss';

gsap.registerPlugin(ScrollTrigger);

export default function PostWall() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    // Title zoom in/out animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    tl.fromTo(
      title,
      {
        scale: 0.2,
        opacity: 0,
        y: 150,
      },
      {
        scale: 1.5,
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }
    )
    .to(
      title,
      {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      }
    )
    .to(
      title,
      {
        scale: 0.7,
        y: -50,
        duration: 0.3,
        ease: 'power2.inOut',
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          message: formData.message,
        }),
      });
      
      if (response.ok) {
        const newPost = await response.json();
        setPosts(prev => [newPost, ...prev]);
        setFormData({ name: '', message: '' });
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to submit post. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('Failed to submit post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <section ref={sectionRef} className="postwall-section" id="postwall">
      <div className="postwall-background">
        <div className="postwall-lightrays-wrapper">
          <LightRays
            raysOrigin="top-center"
            raysColor="#9d4edd"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
          />
        </div>
      </div>
      
      <div className="postwall-container">
        <div className="postwall-title-wrapper">
          <h2 ref={titleRef} className="postwall-title">POST WALL</h2>
        </div>
        
        <div className="postwall-content">
          <div className="postwall-header">
            <button 
              className="postwall-add-btn"
              onClick={() => setShowModal(true)}
            >
              Post Anything on Your Mind
            </button>
            <div className="postwall-count">
              {posts.length} {posts.length === 1 ? 'Message' : 'Messages'}
            </div>
          </div>

          <div className="postwall-posts-section">
            {isLoading ? (
              <div className="postwall-loading">Loading messages...</div>
            ) : posts.length === 0 ? (
              <div className="postwall-empty">
                <p>No messages yet. Be the first to leave a message!</p>
              </div>
            ) : (
              <div className="postwall-notes-grid">
                {posts.map((post, index) => (
                  <div 
                    key={post.id} 
                    className="postwall-note"
                    style={{
                      '--rotation': `${(index % 5) * 2 - 4}deg`,
                      '--offset-x': `${(index % 3) * 10 - 10}px`,
                      '--offset-y': `${(index % 4) * 15 - 20}px`,
                    }}
                  >
                    <div className="note-header">
                      <span className="note-author">{post.name}</span>
                      <span className="note-date">{formatDate(post.created_at)}</span>
                    </div>
                    <div className="note-content">
                      <p>{post.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="postwall-modal-overlay" onClick={() => setShowModal(false)}>
            <div className="postwall-modal-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="postwall-modal-close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
              <h3 className="postwall-modal-title">Post Your Message</h3>
              <form className="postwall-form" onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                
                try {
                  const response = await fetch('/api/posts', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                      name: formData.name,
                      message: formData.message,
                    }),
                  });
                  
                  if (response.ok) {
                    const newPost = await response.json();
                    setPosts(prev => [newPost, ...prev]);
                    setFormData({ name: '', message: '' });
                    setShowModal(false);
                  } else {
                    const errorData = await response.json();
                    alert(errorData.message || 'Failed to submit post. Please try again.');
                  }
                } catch (error) {
                  console.error('Error submitting post:', error);
                  alert('Failed to submit post. Please try again.');
                } finally {
                  setIsSubmitting(false);
                }
              }}>
                <div className="form-group">
                  <label htmlFor="post-name">Your Name</label>
                  <input
                    type="text"
                    id="post-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="post-message">Your Message</label>
                  <textarea
                    id="post-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Write your message here..."
                  />
                </div>
                <button 
                  type="submit" 
                  className="postwall-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post Message'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

