// src/components/AttendanceLog.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AttendanceLog() {
    const [attendanceLogs, setAttendanceLogs] = useState([]);

    useEffect(() => {
        const fetchAttendanceLogs = async () => {
            const response = await axios.get('http://localhost:8000/api/attendance/log', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setAttendanceLogs(response.data);
        };

        fetchAttendanceLogs();
    }, []);

    return (
        <div>
            <h2>Your Attendance Log</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceLogs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.date}</td>
                            <td>{log.status}</td>
                            <td>{log.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AttendanceLog;
