import React, { useState, useEffect } from 'react';
import './EditProfile.css';

const EditProfile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    setFormData({ name: user?.name || '', bio: user?.bio || '' });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        setUser(data);
        setMessage('Profile updated successfully!');
      } else {
        setMessage(data.error || 'Update failed.');
      }
    } catch (err) {
      setMessage('Something went wrong.');
    }
  };

  if (!user) return <p>Login to edit profile.</p>;

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleUpdate} className="edit-form">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Short Bio"
        />
        <button type="submit">Update</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default EditProfile;
