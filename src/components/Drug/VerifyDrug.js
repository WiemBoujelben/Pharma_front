// components/Drug/VerifyDrug.js
import React, { useState } from "react";
import axios from "axios";

const VerifyDrug = () => {
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");
    setVerificationResult(null);

    try {
      const formData = new FormData();
      formData.append("qrImage", file);

      const response = await axios.post(
        "http://localhost:5000/api/drugs/verify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setVerificationResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Verification failed");
      console.error("Verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Verify Drug</h2>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileUpload}
        disabled={loading}
      />
      
      {loading && <p>Verifying QR code...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {verificationResult && (
        <div>
          {verificationResult.success ? (
            <>
              <h3 style={{ color: "green" }}>Verification Successful</h3>
              <h4>Drug Details:</h4>
              <pre>{JSON.stringify(verificationResult.drug, null, 2)}</pre>
              <h4>IPFS Metadata:</h4>
              <pre>{JSON.stringify(verificationResult.ipfsMetadata, null, 2)}</pre>
            </>
          ) : (
            <>
              <h3 style={{ color: "red" }}>Verification Failed</h3>
              <p>{verificationResult.message}</p>
              {verificationResult.ipfsMetadata && (
                <>
                  <h4>IPFS Metadata (not found in database):</h4>
                  <pre>{JSON.stringify(verificationResult.ipfsMetadata, null, 2)}</pre>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyDrug;