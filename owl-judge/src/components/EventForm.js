import React from 'react';
import './EventForm.css'; // Assuming you will create a CSS file for this component

function EventForm() {
  return (
    <div className="event-form">
      <h2>Create or Edit an Event</h2>
      <form>
        <div className="form-group">
          <label>Event Name:</label>
          <input type="text" name="name" />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" name="date" />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default EventForm;
