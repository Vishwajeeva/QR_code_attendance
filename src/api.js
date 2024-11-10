// src/services/api.js
import axios from 'axios';

// Set the base URL for the API
const API_URL = 'http://localhost:8000/api'; // Base URL for API

// Enable sending cookies with each request
axios.defaults.withCredentials = true;

// Register new user
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    return { error: error.response?.data || 'Request failed' };
  }
};

// Login user
export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    return { error: error.response?.data || 'Request failed' };
  }
};

// Generate QR Code
export const generateQRCode = async (data, token) => {
  try {
    const response = await axios.post(`${API_URL}/generate_qr_code/`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token if authentication is required
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error generating QR Code:', error);
    return { success: false, error: error.response?.data || 'Request failed' };
  }
};

// Mark Attendance
export const markAttendance = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/mark-attendance/`, data);
    return response.data;
  } catch (error) {
    console.error("Error marking attendance:", error);
  }
};

// Get Student Attendance
export const getStudentAttendance = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/attendance/student/${studentId}/attendance/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error;
  }
};
