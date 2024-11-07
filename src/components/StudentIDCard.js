// src/components/StudentIDCard.js

import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';  // A library to render QR code
import axios from 'axios';

function StudentIDCard() {
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            const response = await axios.get('http://localhost:8000/api/student/me', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setStudent(response.data);
        };

        fetchStudentDetails();
    }, []);

    return (
        <div>
            {student ? (
                <div>
                    <h2>Student ID Card</h2>
                    <img src={student.photo} alt="Student" width="100" height="100" />
                    <p>Name: {student.name}</p>
                    <p>Department: {student.department}</p>
                    <QRCode value={student.qr_code} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default StudentIDCard;
