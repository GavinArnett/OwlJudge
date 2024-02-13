import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; 
import ksuLogo from './Images/KSU-Logo.png'; 

function Navigation() {
  return (
    <nav>
      <ul>
        <li className="logo-item">
          <img src={ksuLogo} alt="KSU Logo" className="ksu-logo" />
        </li>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/event-form">Create Event</Link></li> 
      </ul>
    </nav>
  );
}

export default Navigation;
