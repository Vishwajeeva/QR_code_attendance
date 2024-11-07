// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>QR Code Based Smart Attendance System</h1>
            <div>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
            <div>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </div>
            <div>
                <Link to="/qr-scanner">
                    <button>QR Scanner</button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
