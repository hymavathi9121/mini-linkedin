import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreatePost from '../components/CreatePost';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`);
      setPosts(res.data);
      setError('');
    } catch (error) {
      setError('Failed to load posts. Try again later.');
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Instead of using newPost directly (which may not include populated author), fetch all posts again
  const handlePostCreated = () => {
    fetchPosts();
  };

  return (
    <div className="home-page">
      <h2>News Feed</h2>
      <CreatePost onPostCreated={handlePostCreated} />

      {loading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        <div className="post-feed">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <h4>{post.author?.name || 'Unknown User'}</h4>
                <span className="post-date">{new Date(post.createdAt).toLocaleString()}</span>
              </div>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
