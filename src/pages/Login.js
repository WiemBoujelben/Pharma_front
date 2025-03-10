import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [wallet, setWallet] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Attempting to login with wallet:", wallet); // Debug log
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { wallet },
        { withCredentials: true }
      );
      console.log("Login response:", response.data); // Log the response
    
      // Check if the user is an admin
      if (response.data.isAdmin) {
        console.log("Redirecting to /admin"); // Log redirection
        navigate("/admin"); // Redirect to admin dashboard
      } else {
        console.log("Redirecting to /drugs"); // Log redirection
        navigate("/drugs"); // Redirect to user dashboard
      }
    } catch (err) {
      console.error("Login error:", err); // Debug log
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Wallet Address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;