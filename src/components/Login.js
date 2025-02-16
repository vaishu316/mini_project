import React from "react";

const Login = ({ setShowLogin }) => {
  return (
    <div className="position-fixed top-50 start-50 translate-middle p-4 bg-white shadow-lg rounded" style={{ width: "300px", zIndex: "1050" }}>
      <h5 className="text-center mb-3">Log In</h5>
      <input type="email" className="form-control mb-2" placeholder="Email" />
      <input type="password" className="form-control mb-2" placeholder="Password" />
      <button className="btn btn-success w-100">Login</button>
      <button className="btn btn-secondary w-100 mt-2" onClick={() => setShowLogin(false)}>Close</button>
    </div>
  );
};

export default Login;
