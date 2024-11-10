// /src/components/StudentPage.js
import React, { useEffect, useState } from 'react';
import { getStudentAttendance } from '../api'; // Assuming this API fetches student details and attendance
import { useNavigate } from 'react-router-dom';

function StudentPage() {
  const [attendance, setAttendance] = useState([]);
  const [studentInfo, setStudentInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      const studentId = 'student-id'; // Replace with actual student ID or fetch from the logged-in user session
      const data = await getStudentAttendance(studentId);
      setAttendance(data.attendance);
      setStudentInfo(data.student);
    };

    fetchStudentData();
  }, []);

  const handleQRScan = () => {
    navigate('/qrscanner');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h2>Welcome, {studentInfo.name}</h2>
      <p>Email: {studentInfo.email}</p>
      <p>Student ID: {studentInfo.studentId}</p>
      <p>Attendance Summary:</p>

      {/* Attendance Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length > 0 ? (
            attendance.map((record, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{record.type}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {new Date(record.timestamp).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center', padding: '8px' }}>
                No attendance records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={handleQRScan}>Scan QR Code</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default StudentPage;

