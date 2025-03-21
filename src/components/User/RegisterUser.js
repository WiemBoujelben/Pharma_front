import React, { useState } from "react";
import axios from "axios";
import walletConnectFcn from "../hedera/walletConnectFcn"; // Import wallet connection function
import contractExecuteFcn from "../hedera/contractExecuteFcn"; // Import contract execution function

const RegisterUser = () => {
  const [role, setRole] = useState("Manufacturer");
  const [hashScanLink, setHashScanLink] = useState("");
  const [error, setError] = useState("");
  const [connectedWallet, setConnectedWallet] = useState("");
  const [provider, setProvider] = useState(null); // Store provider
  const [network, setNetwork] = useState(null); // Store network

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      const [selectedAccount, provider, network] = await walletConnectFcn();
      setConnectedWallet(selectedAccount);
      setProvider(provider); // Save provider
      setNetwork(network); // Save network
      setError("");
    } catch (err) {
      setError("Failed to connect wallet");
      console.error("Error connecting wallet:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!connectedWallet) {
      setError("Please connect your wallet first");
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(connectedWallet)) {
      alert("Invalid wallet address");
      return;
    }

    try {
      // Step 1: Execute the contract function
      const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; // Replace with your contract address
      const gasLimit = 1000000; // Adjust gas limit as needed

      // Convert role to uint8
      const validRoles = ["Manufacturer", "Distributor", "PublicPharmacy", "PrivatePharmacy"];
      const roleIndex = validRoles.indexOf(role);

      if (roleIndex === -1) {
        throw new Error("Invalid role selected");
      }

      console.log("Calling contract with:", {
        wallet: connectedWallet,
        roleIndex,
        contractAddress,
        gasLimit,
      });

      // Call the contract execution function
      const [txHash] = await contractExecuteFcn(
        [connectedWallet, provider, network],
        contractAddress,
        "registerUser", // Replace with your contract function name
        [connectedWallet, roleIndex], // Function arguments
        gasLimit
      );

      if (!txHash) {
        throw new Error("Transaction hash is undefined");
      }

      // Generate HashScan link
      const transactionId = txHash;
      const hashScanLink = `https://hashscan.io/testnet/transaction/${transactionId}`;

      console.log("Transaction successful. HashScan link:", hashScanLink);

      // Step 2: Send the transaction ID and user details to the backend
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          wallet: connectedWallet,
          role,
          transactionId,
          hashScanLink,
        },
        { withCredentials: true }
      );

      console.log("Backend response:", response.data); // Log the response data

      alert(`User registered successfully! Transaction ID: ${transactionId}`);
      setHashScanLink(hashScanLink);
    } catch (err) {
      console.error("Error registering user:", err);
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="register-user-container">
      <form onSubmit={handleSubmit} className="register-form">
        <button type="button" onClick={connectWallet}>
          Connect Wallet
        </button>
        {connectedWallet && <p>Connected Wallet: {connectedWallet}</p>}
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
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RegisterUser;