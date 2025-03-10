import React from "react";
import { Link } from "react-router-dom";

const DrugList = ({ drugs }) => {
  return (
    <div>
      <h2>Drug List</h2>
      <ul>
        {drugs.map((drug) => (
          <li key={drug._id}>
            <p>Name: {drug.name}</p>
            <p>Price: {drug.price}</p>
            <p>Expiry Date: {new Date(drug.expiryDate * 1000).toLocaleDateString()}</p>
            <p>Country of Origin: {drug.countryOfOrigin}</p>
            <p>Country of Provenance: {drug.countryOfProvenance}</p>
            {drug.hashScanLink && (
              <p>
                Transaction Details:{" "}
                <a href={drug.hashScanLink} target="_blank" rel="noopener noreferrer">
                  View on HashScan
                </a>
              </p>
            )}
            <Link to={`/drugs/${drug.transactionId}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrugList;