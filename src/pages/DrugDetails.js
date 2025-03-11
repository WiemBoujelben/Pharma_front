import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DrugDetails = () => {
  const { transactionId } = useParams(); // Get the transactionId from the URL
  const [drug, setDrug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDrugDetails = async () => {
      try {
        console.log("Fetching drug details for transactionId:", transactionId); // Log the transactionId
        const response = await axios.get(
          `http://localhost:5000/api/drugs/${transactionId}`,
          { withCredentials: true }
        );
        setDrug(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch drug details");
        setLoading(false);
        console.error("Error fetching drug details:", err);
      }
    };

    fetchDrugDetails();
  }, [transactionId]);

  if (loading) {
    return <p>Loading drug details...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!drug) {
    return <p>No drug found with the provided transaction ID.</p>;
  }

  return (
    <div>
      <h2>Drug Details</h2>
      <p><strong>Name:</strong> {drug.name}</p>
      <p><strong>Price:</strong> {drug.price}</p>
      <p><strong>Expiry Date:</strong> {new Date(drug.expiryDate * 1000).toLocaleDateString()}</p>
      <p><strong>Country of Origin:</strong> {drug.countryOfOrigin}</p>
      <p><strong>Country of Provenance:</strong> {drug.countryOfProvenance}</p>
      <p>
        <strong>Transaction ID:</strong>{" "}
        <a href={drug.hashScanLink} target="_blank" rel="noopener noreferrer">
          {drug.transactionId}
        </a>
      </p>
    </div>
  );
};

export default DrugDetails;