import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserDetails.css';

function UserDetails() {
  const [userDetails, setUserDetails] = useState(null);
  const [status, setStatus] = useState('pending'); // Assuming 'pending' is the default status
  const [rejectionReason, setRejectionReason] = useState('');
  const { id } = useParams();
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user-details-by-id/${id}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  const handleApproval = async () => {
    // Implement the logic for approval here
    setStatus('approved');
    setShowApprovalPopup(true);
    // You would typically make an API call to your backend to update the status
  };
  

  const handleRejection = async () => {
    if (rejectionReason.trim() === '') {
      alert('Please provide a reason for rejection.');
      return;
    }
    // Implement the logic for rejection here
    setStatus('rejected');
    // You would typically make an API call to your backend to update the status
  };

  const fileFields = ['tenthCertificate', 'twelfthCertificate', 'bTechCertificate', 'covidCertificate', 'passport', 'ds160Form'];

  if (!userDetails) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="user-details">
        
    {showApprovalPopup && (
      <div className="popup-overlay">
        <div className="approval-popup">
          <p>You have approved the application.</p>
          <button onClick={() => setShowApprovalPopup(false)}>Close</button>
        </div>
      </div>
    )}
      <h1>User Details</h1>
      <div className={`user-detail-status ${status}`}>
        <strong>Status:</strong>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
      <div className="user-details-list">
        {Object.entries(userDetails).map(([key, value]) => {
          if (!['__v', '_id'].includes(key)) {
            const isFileField = fileFields.includes(key);
            const downloadUrl = isFileField ? `http://localhost:3000/uploads/${value}` : '';
            return (
              <div key={key} className="user-detail">
                <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
                {isFileField ? (
                  <a href={downloadUrl} download className="download-button">Download File</a>
                ) : (
                  <span>{value.toString()}</span>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
      {status === 'pending' && (
        <div className="action-buttons-container">
          <button className="approve-button" onClick={handleApproval}>Approve</button>
          <button className="reject-button" onClick={() => setStatus('rejecting')}>Reject</button>
        </div>
      )}
      {status === 'rejecting' && (
        <div className="rejection-input-container">
          <textarea
            className="rejection-reason-input"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Reason for rejection"
            required
          ></textarea>
          <button className="reject-confirm-button" onClick={handleRejection}>Confirm Rejection</button>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
