import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCalendarAlt, FaBuilding, FaClipboardList, FaEnvelope, FaUser, FaBookOpen } from "react-icons/fa";
import Login from "./components/Login";
import Register from "./components/Register";

import "./Navbar.css";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-success shadow-sm">
      <a className="navbar-brand text-white fw-bold" href="#"> RMK </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav text-center">
        
          <li className="nav-item mx-3"><a className="nav-link text-white" href="#"><FaBuilding /> Facilities</a></li>
          <li className="nav-item mx-3"><a className="nav-link active text-warning" href="#"><FaClipboardList /> Hall Bookings</a></li>
          <li className="nav-item mx-3"><a className="nav-link text-white" href="#"><FaEnvelope /> Contact</a></li>
        </ul>
      </div>

      <div className="d-flex align-items-center">
        <button 
          className="btn btn-light fw-bold rounded-pill px-3 py-1 me-2 shadow-sm"
          style={{ background: "linear-gradient(45deg, #56ab2f, #a8e063)", color: "white", border: "none" }}
          onClick={() => setShowLogin(true)}
        >
          <FaUser /> Log In
        </button>
        
        <button 
          className="btn btn-warning fw-bold rounded-pill px-3 py-1 me-2 shadow-sm"
          style={{ background: "linear-gradient(45deg, #ff9966, #ff5e62)", color: "white", border: "none" }}
          onClick={() => setShowRegister(true)}
        >
          <FaUser /> Register
        </button>

        <a className="nav-link text-white fw-bold ms-3" href="#">
          <FaBookOpen /> User Manual
        </a>
      </div>

      {showLogin && <Login setShowLogin={setShowLogin} />}
      {showRegister && <Register setShowRegister={setShowRegister} />}
    </nav>
  );
};

export default Navbar;
