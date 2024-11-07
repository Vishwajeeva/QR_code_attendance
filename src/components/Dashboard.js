// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [attendance, setAttendance] = useState([]);
    const userRole = localStorage.getItem('role'); // Determine whether student or faculty

    useEffect(() => {
        const fetchAttendance = async () => {
            const response = await axios.get('http://localhost:8000/api/attendance/log', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setAttendance(response.data);
        };

        fetchAttendance();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {userRole === 'student' ? (
                <div>
                    <h3>Your Attendance Log</h3>
                    {/* Display student-specific attendance */}
                </div>
            ) : (
                <div>
                    <h3>Faculty Attendance Overview</h3>
                    {/* Display faculty-specific attendance logs */}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
