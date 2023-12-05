import React, { useState } from 'react';
import backgroundImage from './Img1.jpg'; // Ensure this path is correct
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!emailRegex.test(username)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain both letters and numbers.');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      // Make a POST request to your server's /register route
      await axios.post('http://localhost:3000/register', {
        username,
        password,
      });

      console.log(`SignUp attempted for username: ${username}`);
      navigate('/login');
      // Handle successful registration, e.g., redirect the user to a login page
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed. Please try again.');
    }
  };

  // Styles
  const pageStyle = {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 1,
  };

  const formContainerStyle = {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '320px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  };

  const inputStyle = {
    marginBottom: '16px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '10px 0',
    backgroundColor: '#005f73',
    color: 'white',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  };

  const errorStyle = {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  };

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}></div>
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#005f73' }}>Sign Up</h2>
          {error && <p style={errorStyle}>{error}</p>}
          <input
            type="email"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email Address"
            style={inputStyle}
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={inputStyle}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            style={inputStyle}
            required
          />
          <button type="submit" style={buttonStyle}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
