import React, { useState } from 'react';
import axios from 'axios';

function StudentForm() {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    // Add other fields as necessary
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend API endpoint
      await axios.post('http://localhost:5000/api/students', student);
      alert('Student onboarded successfully');
    } catch (error) {
      console.error('Error onboarding student:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={student.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={student.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <br />
      <br />
      <br />
      <input type='file' />
      {/* Add other input fields as necessary */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default StudentForm;
