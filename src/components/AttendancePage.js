// /src/components/Attendance.js
import React, { useState } from 'react';
import { markAttendance } from '../api';
import { useNavigate } from 'react-router-dom';

function Attendance() {
  const [attendanceType, setAttendanceType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (attendanceType) {
      const data = { type: attendanceType, timestamp: new Date().toISOString() };
      await markAttendance(data);
      navigate('/student'); // Redirect to StudentPage after marking attendance
    } else {
      alert('Please select an attendance type.');
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Attendance Type:
          <select
            value={attendanceType}
            onChange={(e) => setAttendanceType(e.target.value)}
          >
            <option value="">--Select--</option>
            <option value="login">Login</option>
            <option value="teabreak">Tea Break</option>
            <option value="lunch">Lunch Break</option>
            <option value="logout">Logout</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Attendance;
