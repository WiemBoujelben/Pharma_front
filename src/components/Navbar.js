import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link to="/admin">Admin</Link>
      <Link to="/drugs">Drugs</Link>
      <Link to="/users">Users</Link>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <p>Please log in</p>
      )}
    </nav>
  );
};

export default Navbar;