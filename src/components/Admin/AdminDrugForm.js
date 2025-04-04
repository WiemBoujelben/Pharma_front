import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import walletConnectFcn from "../hedera/walletConnectFcn";
import contractExecuteFcn from "../hedera/contractExecuteFcn";

const AdminDrugForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [countryOfProvenance, setCountryOfProvenance] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pctCode, setPctCode] = useState("");
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    if (!pctCode) {
      setError("PCT code is required");
      return;
    }

    try {
      // Step 1: Connect to the wallet and get the provider
      const [selectedAccount, provider, network] = await walletConnectFcn();
      const gasLimit = 100000;

      // Step 2: Execute the contract function to submit drug as admin (on-chain)
      const [txHash] = await contractExecuteFcn(
        [selectedAccount, provider, network],
        "submitDrugAsAdmin",
        [pctCode],
        gasLimit
      );

      if (!txHash) {
        throw new Error("Transaction hash is undefined");
      }

      // Generate HashScan link
      const transactionId = txHash;
      const hashScanLink = `https://hashscan.io/testnet/transaction/${transactionId}`;

      // Prepare off-chain drug data
      const newDrug = {
        name,
        price: Number(price),
        expiryDate: Math.floor(new Date(expiryDate).getTime() / 1000),
        countryOfOrigin,
        countryOfProvenance,
        quantity: Number(quantity),
        transactionId,
        hashScanLink,
        currentHolder: selectedAccount,
        pctCode,
        history: [{
          holder: selectedAccount,
          timestamp: Math.floor(Date.now() / 1000),
          role: "CentralPharmacy"
        }],
        status: "Approved"
      };

      // Step 3: Send the transaction ID and drug details to the backend
      const saveResponse = await axios.post(
        "http://localhost:5000/api/admin/save-admin-drug-data",
        newDrug,
        { withCredentials: true }
      );

      alert(`Drug submitted and approved successfully! 
             Transaction ID: ${transactionId}
             QR Code URL: http://localhost:5000${saveResponse.data.qrCodeUrl}`);
      navigate("/admin/drugs");
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
      <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
      <select value={pctCode} onChange={(e) => setPctCode(e.target.value)} required>
        <option value="">Select PCT Code</option>
        <option value="PCT01">PCT01</option>
        <option value="PCT02">PCT02</option>
        <option value="PCT03">PCT03</option>
      </select>
      <button type="button" onClick={connectWallet}>Connect Wallet</button>
      {wallet && <p>Connected Wallet: {wallet}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Submit Drug</button>
    </form>
  );
};

export default AdminDrugForm;