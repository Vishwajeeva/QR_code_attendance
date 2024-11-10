// /src/components/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/bg.png'; 
function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <h1>Welcome to Smart QR Code Attendance System</h1>
      </div>
      <img src={logo} alt="Smart QR Code Logo" className="animated-logo" /> 
    </div>
  );
}

export default Home;
