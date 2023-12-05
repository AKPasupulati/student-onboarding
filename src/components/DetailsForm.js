import React, { useState, useRef, useEffect, useContext } from 'react';
import './DetailsForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';

function DetailsForm() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const [email, setEmail] = useState(''); // State to hold the email
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [courses, setCourses] = useState('');
  const [whyTAMUCC, setWhyTAMUCC] = useState('');

  const tenthCertificateRef = useRef();
  const twelfthCertificateRef = useRef();
  const bTechCertificateRef = useRef();
  const covidCertificateRef = useRef();
  const passportRef = useRef();
  const ds160FormRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('country', country);
    formData.append('courses', courses);
    formData.append('whyTAMUCC', whyTAMUCC);
    formData.append('tenthCertificate', tenthCertificateRef.current.files[0]);
    formData.append('twelfthCertificate', twelfthCertificateRef.current.files[0]);
    formData.append('bTechCertificate', bTechCertificateRef.current.files[0]);
    formData.append('covidCertificate', covidCertificateRef.current.files[0]);
    formData.append('passport', passportRef.current.files[0]);
    formData.append('ds160Form', ds160FormRef.current.files[0]);

    

    try {
      await axios.post('http://localhost:3000/submit-details', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsSubmitted(true); // Set submission state to true on success
      setTimeout(() => {
        setIsSubmitted(false);
        navigate('/submission-status'); // Redirect to the status page after 5 seconds
      }, 5000);
    } catch (error) {
      console.error('Error submitting details:', error);
    }
  };

  const RequiredStar = () => (
    <span className="required-star" title="This is required">*</span>
  );

  useEffect(() => {
    setEmail(location.state?.email || '');
    // Check if email is passed in the location state
    if (!location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  useEffect(() => {
    if (!user.detailsSubmitted) {
      setEmail(user.email);
    } else {
      navigate('/submission-status');
    }
  }, [user, navigate]);

  return (
    <div className="details-form-container">
      {isSubmitted && (
        <div className="success-popup">
          <div className="success-popup-icon">✔</div>
          <h4>Your details have been submitted successfully!</h4>
        </div>
      )}

      {!isSubmitted && (
        <form onSubmit={handleSubmit} className="details-form">
          <h2 className="form-title">Enter Your Details</h2>
          <label>First Name<RequiredStar /></label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

          <label>Last Name<RequiredStar /></label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

          <label>Email<RequiredStar /></label>
          <input type="text"  className="email-input" value={email} readOnly/>
          

          <label>Address<RequiredStar /></label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />

          <label>Country<RequiredStar /></label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />

          <label>Courses<RequiredStar /></label>
          <input type="text" value={courses} onChange={(e) => setCourses(e.target.value)} required />

          <label>10th Certificate<RequiredStar /></label>
          <input type="file" ref={tenthCertificateRef} required />

          <label>12th Certificate<RequiredStar /></label>
          <input type="file" ref={twelfthCertificateRef} required />

          <label>BTech Certificate<RequiredStar /></label>
          <input type="file" ref={bTechCertificateRef} required />

          <label>Covid Certificate<RequiredStar /></label>
          <input type="file" ref={covidCertificateRef} required />

          <label>Passport<RequiredStar /></label>
          <input type="file" ref={passportRef} required />

          <label>DS-160 Form<RequiredStar /></label>
          <input type="file" ref={ds160FormRef} required />

          <label>Why only TAMUCC?<RequiredStar /></label>
          <textarea value={whyTAMUCC} onChange={(e) => setWhyTAMUCC(e.target.value)} required></textarea>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default DetailsForm;
