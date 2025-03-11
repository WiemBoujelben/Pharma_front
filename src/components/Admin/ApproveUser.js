import React, { useState } from "react";
import axios from "axios";

const ApproveUser = () => {
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const [approvalLink, setApprovalLink] = useState("");

  const handleApprove = async () => {
    try {
      setError("");
      const response = await axios.post(
        "http://localhost:5000/api/admin/approve-user",
        { wallet },
        { withCredentials: true }
      );
      setApprovalLink(response.data.hashScanLink);
      alert(response.data.message);
      console.log("User approved successfully:", response.data.user);
    } catch (err) {
      if (err.response?.status === 500) {
        setError("Server error: Unable to approve user. Please try again later.");
      } else if (err.response?.status === 404) {
        setError("User not found.");
      } else {
        setError("An unexpected error occurred.");
      }
      console.error("Error approving user:", err);
    }
  };

  return (
    <div>
      <h2>Approve User</h2>
      <input
        type="text"
        placeholder="Wallet Address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
      />
      <button onClick={handleApprove}>Approve</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {approvalLink && (
        <p>
          Approval Transaction:{" "}
          <a href={approvalLink} target="_blank" rel="noopener noreferrer">
            View on HashScan
          </a>
        </p>
      )}
    </div>
  );
};

export default ApproveUser;