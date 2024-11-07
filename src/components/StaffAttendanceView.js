// src/components/StaffAttendanceView.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StaffAttendanceView() {
    const [studentList, setStudentList] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await axios.get('http://localhost:8000/api/user/students', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setStudentList(response.data);
        };

        fetchStudents();
    }, []);

    const handleApproveStudent = async (studentId) => {
        await axios.post(
            `http://localhost:8000/api/user/approve/${studentId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }
        );
        alert('Student Approved');
    };

    const handleRejectStudent = async (studentId) => {
        await axios.delete(`http://localhost:8000/api/user/reject/${studentId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        alert('Student Registration Rejected');
    };

    return (
        <div>
            <h2>Staff - View Attendance & Approve Registrations</h2>
            <div>
                <h3>Student Registration Requests</h3>
                {studentList.map((student) => (
                    <div key={student.id}>
                        <p>{student.name}</p>
                        <button onClick={() => handleApproveStudent(student.id)}>
                            Approve
                        </button>
                        <button onClick={() => handleRejectStudent(student.id)}>
                            Reject
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StaffAttendanceView;
