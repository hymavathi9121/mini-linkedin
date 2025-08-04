import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?._id;

        if (!userId) {
          setError('User ID not found. Please login again.');
          setLoading(false);
          return;
        }
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data.user);
        setPosts(res.data.posts || []);
      } catch (err) {
        setError('Failed to load profile.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-container">
      <div className="theme-toggle">
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Switch to {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
        </button>
      </div>

      <div className="profile-header">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0D8ABC&color=fff`}
          alt="Profile"
        />
        <h2>👤 {userData.name}</h2>
      </div>

      <div className="profile-details">
        <strong>Email:</strong><p>{userData.email}</p>
        <strong>Bio:</strong><p>{userData.bio}</p>
      </div>

      <div className="posts-section">
        <h3>📝 Your Posts</h3>
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div className="post-card" key={post._id}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <small>Posted on: {new Date(post.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
