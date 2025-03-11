import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import DrugPage from "./pages/DrugPage";
import UserPage from "./pages/UserPage";
import DrugDetails from "./pages/DrugDetails";

import Login from"./pages/Login";
import Register from"./pages/Register";
import Home from "./pages/HomePage";
import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <div>
      <Navbar />
      <div className="center-card">
      <div className="transparent-card">
      <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/drugs" element={<DrugPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/drugs/:transactionId" element={<DrugDetails />} />

        
      </Routes>
      </div>
      </div>
      </div>
    </Router>
  );
}

export default App;