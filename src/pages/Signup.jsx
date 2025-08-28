import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password}),
      });

      let data;
      try {
        data = await res.json(); // parse response safely
      } catch (jsonError) {
        throw new Error("Invalid response from server");
      }

      if (res.ok) {
        alert("Signup successful!");

        const user = {
          name,
          email,
          score: 0,
          token: data.token || null,
          profileImage: null,
        };

        localStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event("storage"));
        navigate("/profile");
      } else {
        alert(data.msg || "Signup failed");
      }
    } catch (err) {
      alert("Error signing up. Please try again.");
      console.error("❌ Signup error:", err.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <div className="signup-redirect">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
