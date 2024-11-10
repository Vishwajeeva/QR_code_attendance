// src/components/Register.js

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     password2: "",
//   });
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);

//     // Basic form validation
//     if (formData.password !== formData.password2) {
//       setError("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     if (formData.password.length < 8) {
//       setError("Password must be at least 8 characters");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // Send POST request to the backend API
//       await axios.post("http://127.0.0.1:8000/api/register/", formData);
//       navigate("/student-login"); // Redirect to login page after successful registration
//     } catch (error) {
//       console.error("Error:", error.response ? error.response.data : error.message);
//       setError(error.response ? error.response.data : "Failed to register");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Register</h2>
//       {error && <p className="error">{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <label>Username:</label>
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//         />

//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//         />

//         <label>Confirm Password:</label>
//         <input
//           type="password"
//           name="password2"
//           value={formData.password2}
//           onChange={handleChange}
//         />

//         <button type="submit" disabled={isLoading}>
//           {isLoading ? "Registering..." : "Register"}
//         </button>
//       </form>

//       <div className="links">
//         <Link to="/student-login">Already Registered? Login</Link>
//         <span> | </span>
//         <Link to="/">Back</Link>
//       </div>
//     </div>
//   );
// }


// src/components/Register.js

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);  // Toggle between Sign Up and Sign In
  const [successMessage, setSuccessMessage] = useState("");  // Add success message state
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(""); // Clear any previous success message
    setIsLoading(true);

    if (isSignUp) {
      // Register new user
      if (formData.password !== formData.password2) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters");
        setIsLoading(false);
        return;
      }

      try {
        await axios.post("http://127.0.0.1:8000/api/register/", formData);
        setSuccessMessage("Registration successful! You can now sign in.");
        setIsSignUp(false); // Automatically switch to Sign In form
      } catch (error) {
        setError(error.response ? error.response.data : "Failed to register");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Log in existing user
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/login/", {
          email: formData.email,
          password: formData.password,
        });

        // Store tokens and student data in localStorage
        localStorage.setItem("accessToken", response.data.tokens.access);
        localStorage.setItem("refreshToken", response.data.tokens.refresh);
        localStorage.setItem("studentInfo", JSON.stringify(response.data.student));

        navigate("/student"); // Redirect to Student Page after login
      } catch (error) {
        setError("Failed to login");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Toggle between sign up and sign in
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(null); // Clear errors when switching forms
    setFormData({
      username: "",
      email: "",
      password: "",
      password2: "",
    });
    setSuccessMessage(""); // Clear success message when switching
  };

  return (
    <div className={`container ${isSignUp ? 'active' : ''}`}>
      {isSignUp && (
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input type="text" name="username" placeholder="Full Name" value={formData.username} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="password" name="password2" placeholder="Confirm Password" value={formData.password2} onChange={handleChange} />
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <button type="submit" disabled={isLoading}>Sign Up</button>
          </form>
        </div>
      )}

      {!isSignUp && (
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={isLoading}>Sign In</button>
          </form>
        </div>
      )}

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome!</h1>
            <p>Enter your details to use all site features.</p>
            <button onClick={toggleForm}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Student!</h1>
            <p>Register with your personal details to use all features.</p>
            <button onClick={toggleForm}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
