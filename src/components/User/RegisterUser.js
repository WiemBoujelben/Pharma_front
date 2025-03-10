import React, { useState } from "react";
import axios from "axios";


const RegisterUser = () => {
  const [wallet, setWallet] = useState("");
  const [role, setRole] = useState("Manufacturer");
  const [hashScanLink, setHashScanLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", { wallet, role });
      alert(response.data.message);
      setHashScanLink(response.data.hashScanLink); // Set the HashScan link
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Wallet Address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Manufacturer">Manufacturer</option>
          <option value="Distributor">Distributor</option>
          <option value="PublicPharmacy">Public Pharmacy</option>
          <option value="PrivatePharmacy">Private Pharmacy</option>
        </select>
        <button type="submit">Register</button>
      </form>
      {hashScanLink && (
        <p>
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