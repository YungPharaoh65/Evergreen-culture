import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        </li>
        <li>
          <Link to="/Details" style={{ color: 'white', textDecoration: 'none' }}>Details</Link>
        </li>
        <li>
          <Link to="/About" style={{ color: 'white', textDecoration: 'none' }}>About</Link>
        </li>
        <li>
          <Link to="/FactsAndInfo" style={{ color: 'white', textDecoration: 'none' }}>Facts & Info</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
