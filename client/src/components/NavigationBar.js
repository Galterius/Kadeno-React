import React from 'react';
import '../App.css'
import { Link } from 'react-router-dom';

function NavigationBar() {
  const navStyle ={
    color: 'white'
  };

  return (
    <nav>
      <h3>Sell it</h3>
      <ul className="nav-links">
      <Link style={navStyle} to="/about">
        <li>About</li>
      </Link>
      <Link style={navStyle} to="/listings">
        <li>Listings</li>
      </Link>
      </ul>
    </nav>
  );
}

export default NavigationBar;