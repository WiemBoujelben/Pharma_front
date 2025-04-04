import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ApprovedUsers from "../components/Admin/ApprovedUsers";
import DrugApproval from "../components/Admin/DrugApproval";
import Inventory from "../components/Admin/Inventory";
import AdminDrugForm from "../components/Admin/AdminDrugForm"; // Import the new form component
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
      
      {/* Main Tabs Navigation - Updated with Admin Drug Submission tab */}
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
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "addDrug" ? "active" : ""}`}
            onClick={() => setActiveTab("addDrug")}
          >
            Add Drug (Admin)
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
        
        {/* Inventory Tab */}
        {activeTab === "inventory" && (
          <div className="">
            <div className="">
              <Inventory />
            </div>
          </div>
        )}
        
        {/* New Admin Drug Submission Tab */}
        {activeTab === "addDrug" && (
          <div className="">
            <div className="">
              
              <div className="">
                <AdminDrugForm />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;