import React from "react";
import { Link } from "react-router-dom";

const DrugList = ({ drugs }) => {
  return (
    <div className="table-container">
      <h2>Drug List</h2>
      <table className="table-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
            <th>Country of Origin</th>
            <th>Current Holder</th>
            <th>Transaction Details</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <tr key={drug._id}>
              <td>{drug.name}</td>
              <td>{drug.price}</td>
              <td>{drug.quantity}</td>
              <td>{new Date(drug.expiryDate * 1000).toLocaleDateString()}</td>
              <td>{drug.countryOfOrigin}</td>
              <td>{drug.currentHolder}</td>
              <td>
                {drug.hashScanLink && (
                  <a
                    href={drug.hashScanLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hashscan-link"
                  >
                    View on HashScan
                  </a>
                )}
              </td>
              <td>
                <Link to={`/drugs/${drug.transactionId}`} className="details-link">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrugList;