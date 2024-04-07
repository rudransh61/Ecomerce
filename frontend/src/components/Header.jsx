// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav>
        <ul className="flex justify-between items-center">
          <li><Link to="/" className="text-xl font-bold">Home</Link></li>
          <li><Link to="/cart" className="text-xl font-bold">Cart</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;