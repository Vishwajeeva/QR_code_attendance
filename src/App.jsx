// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import QRScannerComponent from './components/QRScannerComponent';
import AttendanceLog from './components/AttendanceLog';
import StudentIDCard from './components/StudentIDCard';
import StaffAttendanceView from './components/StaffAttendanceView';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/qr-scanner" element={<QRScannerComponent />} />
                <Route path="/attendance-log" element={<AttendanceLog />} />
                <Route path="/student-id-card" element={<StudentIDCard />} />
                <Route path="/staff-attendance-view" element={<StaffAttendanceView />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
