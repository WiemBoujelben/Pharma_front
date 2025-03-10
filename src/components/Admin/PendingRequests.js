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
    <div>
      <h2>Pending Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <p>Wallet: {request.wallet}</p>
            <p>Role: {request.role}</p>
            {request.registrationHashScanLink && (
              <p>
                Registration Transaction:{" "}
                <a href={request.registrationHashScanLink} target="_blank" rel="noopener noreferrer">
                  View on HashScan
                </a>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingRequests;