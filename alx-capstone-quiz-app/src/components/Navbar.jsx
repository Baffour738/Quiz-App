import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const btnStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 20px",
    border: "1px solid #6b7280",
    borderRadius: 6,
    background: "#f8f8f8",
    color: "#111827",
    textDecoration: "none",
    fontWeight: 500,
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    cursor: "pointer",
  };
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 40, background: "linear-gradient(90deg, #06b6d4, #22d3ee)", color: "white" }}>
      <div style={{ margin: "0 auto", maxWidth: 960, padding: "0 16px" }}>
        <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h1 style={{ fontWeight: 600, fontSize: 18, letterSpacing: 0.2 }}>Quiz App</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ ...btnStyle, marginRight: 48 }}>
              Home
            </Link>
            <Link to="/history" style={btnStyle}>
              History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
