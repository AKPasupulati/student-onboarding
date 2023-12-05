import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import TopBar from './components/TopBar';
import Login from './components/Login'; // Make sure to create this component
import SignUp from './components/Signup'; // Make sure to create this component
import DetailsForm from './components/DetailsForm';
import SubmissionStatus from './components/SubmissionStatus';
import { UserProvider } from './components/UserContext';
import AdminDashboard from './components/AdminDashboard';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <UserProvider>
    <Router>
      <TopBar />
      
      <Routes>
      
        <Route path="/onboard" element={<StudentForm />} />
        <Route path="/" element={<StudentList />} />
        <Route path="/login" element={<Login />} /> // Login route
        <Route path="/signup" element={<SignUp />} /> // Sign Up route
        <Route path="/details-form" element={<DetailsForm />} /> // Details Form route
        <Route path="/submission-status" element={<SubmissionStatus />} />
        <Route path="/admin-dashboard" element= {<AdminDashboard />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}

export default App;
