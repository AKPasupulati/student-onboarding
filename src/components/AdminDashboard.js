import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3000/all-details', { withCredentials: true });
        console.log(response.data);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, []);

  const handleUserClick = (id) => {
    navigate(`/user-details/${id}`);
  };

  return (
    <div className="user-details-container">
      <h1>Admin Dashboard</h1>
      {details.map((detail) => (
        <button key={detail._id} className="user-detail-button" onClick={() => handleUserClick(detail._id)}>
          {detail.firstName} {detail.lastName}
        </button>
      ))}
    </div>
  );
}

export default AdminDashboard;
