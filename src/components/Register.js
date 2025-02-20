import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    rollOrFacultyId: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Email validation function
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    // Validation checks
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        department: formData.department,
        rollOrFacultyId: formData.rollOrFacultyId,
        createdAt: new Date().toISOString(),
      });

      setLoading(false);
      alert("Registration Successful!");
      navigate("/"); // Redirect to homepage
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Choose a stronger password.");
      } else {
        setError("Error: " + err.message);
      }
    }
  };

  return (
    <div className="position-fixed top-50 start-50 translate-middle p-4 bg-white shadow-lg rounded" style={{ width: "350px", zIndex: "1050" }}>
      <h2 className="text-center text-primary">Register</h2>
      {error && <p className="alert alert-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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
            type="text"
            name="department"
            className="form-control"
            placeholder="Enter your department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="rollOrFacultyId"
            className="form-control"
            placeholder="Enter your Roll No or Faculty ID"
            value={formData.rollOrFacultyId}
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
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="btn btn-success btn-block" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-3">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
