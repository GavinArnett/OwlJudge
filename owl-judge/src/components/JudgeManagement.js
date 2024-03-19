import React, { useState } from 'react';
import { database } from '../config/firebase';
import { ref, push } from 'firebase/database';
import './JudgeManagement.css'; // Import the CSS for styling

const JudgeManagement = () => {
  const [judge, setJudge] = useState({ name: '', affiliation: '', preferences: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJudge({ ...judge, [name]: value });
  }

  const addJudge = () => {
    const judgesRef = ref(database, 'judges');
    push(judgesRef, judge).then(() => {
      alert('Judge added successfully!');
      setJudge({ name: '', affiliation: '', preferences: '' }); // Reset form
    }).catch((error) => {
      alert('Error adding judge. Please try again.');
      console.error('Error adding judge: ', error);
    });
  }

  return (
    <div className="management-container">
      <form className="judge-form">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={judge.name} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Affiliation:</label>
          <input type="text" name="affiliation" value={judge.affiliation} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Preferences:</label>
          <input type="text" name="preferences" value={judge.preferences} onChange={handleInputChange} required />
        </div>
        <div className="action-buttons">
          <button type="button" onClick={addJudge}>Add Judge</button>
          {/* Additional buttons for other actions can be added here */}
        </div>
      </form>
    </div>
  );
}

export default JudgeManagement;

