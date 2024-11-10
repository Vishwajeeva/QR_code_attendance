// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './css/nav.css';
import logo from '../assets/apt1.png'; // Corrected import statement

const Navbar = () => {
  return (
    <nav>
      <div className="logo-container">
        {/* <img src={logo} alt="Apptecknow Careers Logo" className="logo" />  Use 'logo' here */}
        <h1>Apptecknow Careers</h1>
      </div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Student</Link></li>
        <li><Link to="/institute-login">Institute</Link></li>
        {/* <li><Link to="/student-login">Student Login</Link></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;

