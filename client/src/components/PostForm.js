import React, { useState } from 'react';
import './PostForm.css';

const PostForm = ({ onPost }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();
      if (res.ok) {
        onPost(data.post);
        setContent('');
      } else {
        alert(data.error || 'Post failed');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="4"
      ></textarea>
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
