import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApproveUser from "../components/Admin/ApproveUser";
import PendingRequests from "../components/Admin/PendingRequests";
import ApprovedUsers from "../components/Admin/ApprovedUsers";
import DrugApproval from "../components/Admin/DrugApproval";
import Inventory from "../components/Admin/Inventory"; // New import
import axios from "axios";
import UserApproval from "../components/Admin/UserApproval";

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  // Check admin status
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/check-admin", {
          withCredentials: true,
        });
        if (!response.data.isAdmin) {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      }
    };
    checkAdmin();
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      
      {/* Main Tabs Navigation - Updated with Inventory tab */}
      <ul className="nav nav-tabs justify-content-center mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            User Management
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "drugs" ? "active" : ""}`}
            onClick={() => setActiveTab("drugs")}
          >
            Drug Approvals
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "inventory" ? "active" : ""}`}
            onClick={() => setActiveTab("inventory")}
          >
            Drug Inventory
          </button>
        </li>
      </ul>
      
      {/* Tab Contents */}
      <div className="tab-content">
        {/* User Management Tab */}
        {activeTab === "users" && (
          <div className="">
            <div className="col-md-12 mb-4">
              <div className="h-100">  
                <div className="">
                  <UserApproval />
                </div>
              </div>
            </div>
            
            
            
            <div className="col-md-12 mb-4">
              <div className="">
                <div className="">
                  <ApprovedUsers />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Drug Approvals Tab */}
        {activeTab === "drugs" && (
          <div className="">
            <div className="">
              <DrugApproval />
            </div>
          </div>
        )}
        
        {/* New Inventory Tab */}
        {activeTab === "inventory" && (
          <div className="">
            <div className="">
              <Inventory />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;