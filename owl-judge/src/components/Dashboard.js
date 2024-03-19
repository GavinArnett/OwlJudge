import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <img src={`${process.env.PUBLIC_URL}/owlJudgeLogo.png`} alt="Owl Judge Logo" style={{ maxWidth: '300px' }} /> {/* Adjust size as needed */}
      <h1>Welcome to Owl Judge</h1>
      <p>Your one-stop platform for managing and judging capstone projects efficiently.</p>
    </div>
  );
}

export default Dashboard;
