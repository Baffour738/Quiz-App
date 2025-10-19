import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-blue-700 to-blue-600 text-white/95 backdrop-blur supports-[backdrop-filter]:bg-blue-600/90">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-14 flex items-center justify-between">
          <h1 className="font-semibold text-lg tracking-tight">Quiz App</h1>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/" className="no-underline inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition">
              Home
            </Link>
            <Link to="/quiz" className="no-underline inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition">
              Quiz
            </Link>
            <Link to="/history" className="no-underline inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-md shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition">
              History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
