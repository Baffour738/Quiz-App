import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-blue-700 to-blue-600 text-white/95 backdrop-blur supports-[backdrop-filter]:bg-blue-600/90">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="h-14 flex items-center justify-between">
          <h1 className="font-semibold text-lg tracking-tight">Quiz App</h1>
          <div className="flex items-center gap-1 sm:gap-3">
            <Link to="/" className="px-2 py-1 rounded-md hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition">
              Home
            </Link>
            <Link to="/quiz" className="px-2 py-1 rounded-md hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition">
              Quiz
            </Link>
            <Link to="/history" className="px-2 py-1 rounded-md hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition">
              History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
