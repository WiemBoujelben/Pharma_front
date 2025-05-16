import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "20vh",
      padding: "20px",
      border:"30px" ,
      textAlign: "center",
    }}>
      <h1 style={{
        fontSize: "3rem",
        fontWeight: "700",
        color: "#2c3e50",
        textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        lineHeight: "1.2",
        maxWidth: "800px",
        margin: "0 auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <span style={{ color: "#3498db" }}>Pharma</span> 
        <span style={{ display: "block", fontSize: "2.5rem", marginTop: "10px" }}>
          Transparent. Trackable. Trusted.
        </span>
      </h1>
    </div>
  );
};

export default Home;