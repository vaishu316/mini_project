import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
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

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
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
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        department: formData.department,
        rollOrFacultyId: formData.rollOrFacultyId,
      });

      alert("Registration Successful! Redirecting to the main page...");
      setTimeout(() => navigate("/"), 2000); // Redirect to the main page after 2 seconds
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please log in or use a different email.");
      } else {
        alert(err.message);
      }
      setError(err.message);
    }
  };

  return (
    <div className="position-fixed top-50 start-50 translate-middle p-4 bg-white shadow-lg rounded" style={{ width: "350px", zIndex: "1050" }}>
      <h2 className="text-center text-primary">Register</h2>
      {error && <p className="alert alert-danger">{error}</p>}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <input type="text" name="name" className="form-control" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <input type="email" name="email" className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <input type="text" name="department" className="form-control" placeholder="Enter your department" value={formData.department} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <input type="text" name="rollOrFacultyId" className="form-control" placeholder="Enter your Roll No or Faculty ID" value={formData.rollOrFacultyId} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <input type="password" name="password" className="form-control" placeholder="Enter password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-success btn-block">Register</button>
      </form>

      <p className="text-center mt-3">
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;
