import React, { useState } from 'react';
import { database } from '../config/firebase';
import { ref, push } from 'firebase/database';
import './EventForm.css';

function EventForm() {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
  });

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventsRef = ref(database, 'events');
      await push(eventsRef, eventDetails);
      alert('Event added successfully!');
      setEventDetails({
        name: '',
        date: '',
        time: '',
        location: '',
      });
    } catch (error) {
      console.error("Error adding event: ", error);
      alert('Error adding event, please try again.');
    }
  };

  return (
    <div className="form-container">
      <form className="event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text"
            name="name"
            value={eventDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={eventDetails.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={eventDetails.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={eventDetails.location}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default EventForm;
