import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/event-form">Create Event</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
