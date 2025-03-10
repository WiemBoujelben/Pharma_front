import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovedUsers = () => {
  const [approvedUsers, setApprovedUsers] = useState([]);

  useEffect(() => {
    const fetchApprovedUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/approved-users", {
          withCredentials: true, // Include session cookie
        });
        setApprovedUsers(response.data);
      } catch (err) {
        console.error("Error fetching approved users:", err);
      }
    };

    fetchApprovedUsers();
  }, []);

  return (
    <div>
      <h2>Approved Users</h2>
      <ul>
        {approvedUsers.map((user) => (
          <li key={user._id}>
            <p>Wallet: {user.wallet}</p>
            <p>Role: {user.role}</p>
            {user.approvalHashScanLink && (
              <p>
                Approval Transaction:{" "}
                <a href={user.approvalHashScanLink} target="_blank" rel="noopener noreferrer">
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

export default ApprovedUsers;