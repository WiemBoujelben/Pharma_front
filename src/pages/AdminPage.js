import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApproveUser from "../components/Admin/ApproveUser";
import PendingRequests from "../components/Admin/PendingRequests";
import ApprovedUsers from "../components/Admin/ApprovedUsers"; // Import the new component
import axios from "axios";

const AdminPage = () => {
  const navigate = useNavigate();

  // Check if the user is an admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/check-admin", {
          withCredentials: true, // Include session cookie
        });
        if (!response.data.isAdmin) {
          navigate("/login"); // Redirect to login if not an admin
        }
      } catch (err) {
        navigate("/login"); // Redirect to login if there's an error
      }
    };
    checkAdmin();
  }, [navigate]);

  return (
    <div className="container mt-5">
    <h1 className="text-center mb-4">Admin Dashboard</h1>
    <div className="">
      <div className="col-md-4 mb-4">
        <div className="">
          <div className="card-body">
            <h5 className="card-title">Approve Users</h5>
            <ApproveUser />
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="">
          <div className="card-body">
            <h5 className="card-title">Pending Requests</h5>
            <PendingRequests />
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="">
          <div className="card-body">
            <h5 className="card-title">Approved Users</h5>
            <ApprovedUsers />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AdminPage;