import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white px-6 py-3 shadow-md">
      <h1 className="font-bold text-lg">Quiz App</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-200">Home</Link>
        <Link to="/quiz" className="hover:text-gray-200">Quiz</Link>
        <Link to="/history" className="hover:text-gray-200">History</Link>
      </div>
    </nav>
  );
};

export default Navbar;
