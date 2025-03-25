import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Ensure Firebase is configured correctly
import { signInWithEmailAndPassword } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      // Firebase Authentication - Sign in with Email & Password
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
  
      // Show a confirmation alert
      if (window.confirm("Login Successful! Click OK to proceed.")) {
        navigate("/facilities"); 
      }
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("User not found. Please register first.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Try again.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    }
  };
  

  return (
    <div className="position-fixed top-50 start-50 translate-middle p-4 bg-white shadow-lg rounded" style={{ width: "350px", zIndex: "1050" }}>
      <h2 className="text-center text-primary">Login</h2>
      {error && <p className="alert alert-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn btn-success btn-block">Login</button>
      </form>

      <p className="text-center mt-3">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
