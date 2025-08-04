import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';


function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Get JWT token

      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.post(
        'http://localhost:5000/api/posts',
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token to backend
          },
        }
      );

      setContent('');
      onPostCreated && onPostCreated(); // Refresh posts
    } catch (err) {
      console.error('Error creating post:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default CreatePost;
