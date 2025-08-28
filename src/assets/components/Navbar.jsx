import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange(); // Run on mount

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-container">
        <div className="logo">JA</div>
        <div className="brand">JavaScript Adventures</div>
      </Link>

      <div className="nav-links">
        <Link to="/GameCardSlider">Games</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/about">About</Link>
        {user && <Link to="/profile">Profile</Link>}
      </div>

      <div className="auth-buttons">
        {user ? (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
