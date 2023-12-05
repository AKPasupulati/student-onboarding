import React, { useState, useEffect } from 'react';
import axios from 'axios';
import studentonboarding from './Img1.jpg';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const containerStyle = {
    width: '100vw', // 100% of the viewport width
    height: '100vh', // 100% of the viewport height
    backgroundImage: `url(${studentonboarding})`,
    backgroundSize: 'cover', // Ensures the image covers the entire viewport
    backgroundPosition: 'center', // Centers the image
    // opacity: 0.7, // Adjusts the opacity of the image
    position: 'fixed', // Makes the background image fixed during scrolling
    top: 0,
    left: 0,
    zIndex: -1, // Ensures the content goes over the background
  };

  const contentStyle = {
    position: 'relative', // Ensures the content is positioned over the background
    zIndex: 2, // Higher than the background's zIndex
    // Add more styles as needed for your content
  };

  return (
    <div>
      <div style={containerStyle}></div> {/* Background container */}
      <div style={contentStyle}> {/* Content container */}
        
        <ul>
          {students.map((student) => (
            <li key={student.id}>{student.name}</li> // Replace 'id' and 'name' with your actual data fields
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentList;
