import React, { useState } from "react";
import axios from "axios";


const RegisterUser = () => {
  const [wallet, setWallet] = useState("");
  const [role, setRole] = useState("Manufacturer");
  const [hashScanLink, setHashScanLink] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
          alert("Invalid wallet address");
          return;
      }
      try {
          const response = await axios.post("http://localhost:5000/api/users/register", { wallet, role });
          alert(response.data.message);
          setHashScanLink(response.data.hashScanLink);
      } catch (err) {
          alert(err.response?.data?.message || "An error occurred");
      }
  };

  return (
    <div className="register-user-container">
      
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Wallet Address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          required
          className="form-input"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-select"
        >
          <option value="Manufacturer">Manufacturer</option>
          <option value="Distributor">Distributor</option>
          <option value="PublicPharmacy">Public Pharmacy</option>
          <option value="PrivatePharmacy">Private Pharmacy</option>
        </select>
        <button type="submit" className="form-button">
          Register
        </button>
      </form>
      {hashScanLink && (
        <p className="hashscan-link">
          View registration transaction on{" "}
          <a href={hashScanLink} target="_blank" rel="noopener noreferrer">
            HashScan
          </a>
        </p>
      )}
    </div>
  );
};

export default RegisterUser;