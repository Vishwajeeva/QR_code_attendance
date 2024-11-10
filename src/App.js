// /src/app.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './css/App.css';
import './css/AuthForm.css';
import Home from './components/Home';
import Register from './components/StudentLogin';
import InstituteLogin from './components/InstituteLogin';
// import StudentLogin from './components/StudentLogin';
import StudentPage from './components/StudentPage';
import InstitutePage from './components/InstitutePage';
import QRScanner from './components/QRScanner'; // Un-commented QRScanner import
import AttendancePage from './components/AttendancePage';
import Navbar from './components/Navbar'; // Import the Navbar

function App() {
  return (
    <Router>
      <Navbar /> {/* Include the Navbar on top of all pages */}
      <Routes>
        {/* Routes for different pages */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/institute-login" element={<InstituteLogin />} />
        {/* <Route path="/student-login" element={<StudentLogin />} /> */}
        <Route path="/student" element={<StudentPage />} />
        <Route path="/institute" element={<InstitutePage />} />
        <Route path="/qrscanner" element={<QRScanner />} /> {/* Un-commented QRScanner route */}
        <Route path="/attendance" element={<AttendancePage />} />
      </Routes>
    </Router>
  );
}

export default App;
