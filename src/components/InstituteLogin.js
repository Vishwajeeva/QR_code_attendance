// // /src/components/InstituteLogin.js

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setIsLoading(true);
  //   try {
  //     const response = await axios.post("http://127.0.0.1:8000/api/institute/login/", formData);
  //     localStorage.setItem("accessToken", response.data.tokens.access);
  //     localStorage.setItem("refreshToken", response.data.tokens.refresh);
  //     localStorage.setItem("user", JSON.stringify(response.data));
  //     navigate("/institute");
  //   } catch (error) {
  //     setError("Failed to login");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

//   return (
//     <div className="institute-login-container">
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <label>Email:</label>
//         <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         <label>Password:</label>
//         <input type="password" name="password" value={formData.password} onChange={handleChange} />
//         <button type="submit" disabled={isLoading}>Login</button>
//       </form>
//       <div className="links">
//         <Link to="/">Back</Link>
//       </div>
//     </div>
//   );
// }









// /src/components/InstituteLogin.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);  // Set to false to show Sign In form by default
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
    } else {
      // Log in existing user
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/institute/login/", formData);
        localStorage.setItem("accessToken", response.data.tokens.access);
        localStorage.setItem("refreshToken", response.data.tokens.refresh);
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/institute");
      } catch (error) {
        setError("Failed to login");
      } finally {
        setIsLoading(false);
      }
    };
  
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
      {/* Sign In Form */}
      {!isSignUp && (
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={isLoading}>Sign In</button>
          </form>
        </div>
      )}

      {/* Sign Up Form */}
      {isSignUp && (
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
          </form>
        </div>
      )}

      {/* Toggle Panel */}
      <div className="toggle-container">
        <div className="toggle">
          {/* Left Panel */}
          <div className="toggle-panel toggle-left">
            <h1>Welcome!</h1>
          </div>

          {/* Right Panel */}
          <div className="toggle-panel toggle-right">
            <h1>Hello, Admin!</h1>
            <p>Enter your details login to use all features.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

