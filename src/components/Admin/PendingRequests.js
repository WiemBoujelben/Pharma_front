import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/pending-requests", {
          withCredentials: true, // Include session cookie
        });
        setRequests(response.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="table-container">
    <h2>Pending Requests</h2>
    <table className="table-table">
      <thead>
        <tr>
          <th>Wallet</th>
          <th>Role</th>
          <th>Registration Transaction</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr key={request._id}>
            <td>{request.wallet}</td>
            <td>{request.role}</td>
            <td>
              {request.registrationHashScanLink && (
                <a
                  href={request.registrationHashScanLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hashscan-link"
                >
                  View on HashScan
                </a>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default PendingRequests;