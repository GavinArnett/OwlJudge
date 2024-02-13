import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { database } from '../config/firebase'; // Adjust based on your file structure
import { ref, get, update } from 'firebase/database';
import './EventForm.css'; // Reuse the CSS from your EventForm

function EditEventForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
  });

  useEffect(() => {
    const eventRef = ref(database, `events/${eventId}`);
    get(eventRef).then((snapshot) => {
      if (snapshot.exists()) {
        setEventDetails(snapshot.val());
      } else {
        alert("Event not found!");
        navigate("/events-dashboard"); // Redirect if the event doesn't exist
      }
    });
  }, [eventId, navigate]);

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventRef = ref(database, `events/${eventId}`);
    await update(eventRef, eventDetails);
    alert('Event updated successfully!');
    navigate("/events-dashboard"); // Redirect back to the dashboard after updating
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
        <button type="submit" className="submit-btn">Update Event</button>
      </form>
    </div>
  );
}

export default EditEventForm;

