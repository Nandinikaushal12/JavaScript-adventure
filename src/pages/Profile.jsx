import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Ensure the correct path to profile.css
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-info">
        <div><strong>Name:</strong> {user.name || "N/A"}</div>
        <div><strong>Email:</strong> {user.email || "N/A"}</div>
        <div><strong>Total Score:</strong> {user.totalScore || 0}</div>
      </div>
      <div className="profile-img-container">
        {user.profileImage ? (
          <img src={user.profileImage} alt="Profile" />
        ) : (
          <span>No profile image</span>
        )}
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;