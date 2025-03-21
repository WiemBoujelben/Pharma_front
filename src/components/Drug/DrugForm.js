import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import walletConnectFcn from "../hedera/walletConnectFcn"; // Import wallet connection function
import contractExecuteFcn from "../hedera/contractExecuteFcn"; // Import contract execution function

const DrugForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [countryOfProvenance, setCountryOfProvenance] = useState("");
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      const [selectedAccount, provider, network] = await walletConnectFcn();
      setWallet(selectedAccount);
      setError("");
    } catch (err) {
      setError("Failed to connect wallet");
      console.error("Error connecting wallet:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wallet) {
      setError("Please connect your wallet first");
      return;
    }
  
    const newDrug = {
      name,
      price: Number(price),
      expiryDate: Math.floor(new Date(expiryDate).getTime() / 1000),
      countryOfOrigin,
      countryOfProvenance,
      wallet, // Pass the wallet address
    };
  
    try {
      // Step 1: Connect to the wallet and get the provider
      const [selectedAccount, provider, network] = await walletConnectFcn();
  
      // Step 2: Execute the contract function
      const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"; // Replace with your contract address
      const gasLimit = 1000000; // Adjust gas limit as needed
  
      // Call the contract execution function
      const [txHash] = await contractExecuteFcn(
        [selectedAccount, provider, network],
        contractAddress,
        "submitDrug", // Replace with your contract function name
        [newDrug.name, newDrug.price, newDrug.expiryDate, newDrug.countryOfOrigin, newDrug.countryOfProvenance], // Function arguments
        gasLimit
      );
  
      if (!txHash) {
        throw new Error("Transaction hash is undefined");
      }
  
      // Generate HashScan link
      const transactionId = txHash;
      const hashScanLink = `https://hashscan.io/testnet/transaction/${transactionId}`;
  
      // Step 3: Send the transaction ID and drug details to the backend
      const saveResponse = await axios.post(
        "http://localhost:5000/api/drugs/save-drug-data",
        {
          ...newDrug,
          transactionId,
          hashScanLink,
        },
        { withCredentials: true }
      );
  
      alert(`Drug submitted successfully! Transaction ID: ${transactionId}`);
      navigate("/drugs");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      console.error("Error submitting drug:", err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Drug Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="date" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
      <input type="text" placeholder="Country of Origin" value={countryOfOrigin} onChange={(e) => setCountryOfOrigin(e.target.value)} required />
      <input type="text" placeholder="Country of Provenance" value={countryOfProvenance} onChange={(e) => setCountryOfProvenance(e.target.value)} required />
      <button type="button" onClick={connectWallet}>Connect Wallet</button>
      {wallet && <p>Connected Wallet: {wallet}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit Drug</button>
    </form>
  );
};

export default DrugForm;