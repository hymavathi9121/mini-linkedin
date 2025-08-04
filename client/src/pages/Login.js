import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useAuth } from '../context/AuthContext'; // Import auth context

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth(); // auth context

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });

    const userData = res.data.user;

    setUser(userData);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userId', userData._id); //REQUIRED for profile fetching

    navigate('/');
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  }
};

  return (
    <div className="login-container">
      <h2>Login to LinkedIn Clone</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p>
          Not registered? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
