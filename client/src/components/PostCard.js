import React from 'react';
import './PostCard.css';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h3>{post.author?.name}</h3>
      <p className="bio">{post.author?.bio}</p>
      <p className="content">{post.content}</p>
      <small>{new Date(post.createdAt).toLocaleString()}</small>
    </div>
  );
};

export default PostCard;
