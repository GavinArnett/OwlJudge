import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav>
      <ul>
        <li className="logo-item">
        </li>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/event-form">Create Event</Link>
        </li>
        <li>
          <Link to="/events-dashboard">Events Dashboard</Link>
        </li>
        <li>
          <Link to="/judge-management">Judge Management</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
