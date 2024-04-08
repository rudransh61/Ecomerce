import React from 'react';
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-white font-bold text-lg">Logo</a>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/cart" className="text-white hover:text-gray-300">Cart</Link>
            <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
          </div>
          {/* Hamburger Menu (for mobile) */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
