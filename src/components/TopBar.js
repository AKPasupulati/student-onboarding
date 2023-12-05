import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function TopBar() {
  const topBarStyle = {
    backgroundColor: '#00205B',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 1rem'
  };

  const logoStyle = {
    fontWeight: 'bold',
    fontSize: '1.5rem'
  };

  const navStyle = {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    margin: 0,
    padding: 0
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '0.5rem', // space between buttons
  };

  const iconButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', 
    border: '1px solid white', // white border
    borderRadius: '20px', // rounded corners
    padding: '0.25rem 1rem', // smaller padding
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.9rem', // smaller font size
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const iconStyle = {
    marginRight: '0.5rem', // space between icon and text
  };

  return (
    <div style={topBarStyle}>
      <Link to="/" style={{ ...logoStyle, textDecoration: 'none', color: 'white' }}>Student Onboarding System</Link>
      <ul style={navStyle}>
        <li><Link to="/academics" style={linkStyle}>ACADEMICS</Link></li>
        <li><Link to="/admissions" style={linkStyle}>ADMISSIONS</Link></li>
        <li><Link to="/cost-and-aid" style={linkStyle}>COST & AID</Link></li>
        <li><Link to="/student-life" style={linkStyle}>STUDENT LIFE</Link></li>
        <li><Link to="/research" style={linkStyle}>RESEARCH</Link></li>
        <li><Link to="/about-us" style={linkStyle}>ABOUT US</Link></li>
        {/* Button container for login and sign up */}
        <li style={buttonContainerStyle}>
          <Link to="/signup" style={iconButtonStyle}>
            <i className="fas fa-user-plus" style={iconStyle}></i> Sign Up
          </Link>
          <Link to="/login" style={iconButtonStyle}>
            <i className="fas fa-sign-in-alt" style={iconStyle}></i> Login
          </Link>
        </li>
      </ul>
      {/* Placeholder for search icon and other icons */}
      <div>
        {/* Icons would go here */}
      </div>
    </div>
  );
}

export default TopBar;
