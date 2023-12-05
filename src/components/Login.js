import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from './Img1.jpg';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    


    if (!emailRegex.test(username)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      console.log(response);
      if (response.data.detailsSubmitted) {
        // setUser({ isLoggedIn: true, detailsSubmitted: true, email: username });
        navigate('/submission-status'); // Navigate to status page if details are already submitted
      } else {
        // Check if details have been submitted for the user
      const checkSubmissionResponse = await axios.get(`http://localhost:3000/check-submission/${username}`);
      
      if (checkSubmissionResponse.data.detailsSubmitted) {
        navigate('/submission-status');
      } else {
        // setUser({ isLoggedIn: true, detailsSubmitted: false, email: username });
        navigate('/details-form'); // Navigate to details form if not submitted
      }
    }
    //   // if(response.data.isAdmin){
    //   //   // navigate('/admin-dashboard')
    //   // }

    if (username === "admin123@gmail.com") {
      // This is where you navigate to the AdminDashboard
      navigate('/admin-dashboard');
    } else if (response.data.detailsSubmitted) {
      navigate('/submission-status'); // Navigate to status page if details are already submitted
    } else {
      navigate('/details-form', { state: { email: username } }); // Navigate to details form if not submitted
    }

  

    
  }catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
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
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#005f73' }}>Login</h2>
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
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
