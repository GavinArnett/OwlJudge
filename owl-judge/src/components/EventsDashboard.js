import React, { useState, useEffect } from 'react';
import { database } from '../config/firebase';
import { ref, onValue, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import './EventsDashboard.css'; // Import the new CSS file

function EventsDashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const eventsRef = ref(database, 'events');
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedEvents = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })) : [];
      setEvents(loadedEvents);
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const eventRef = ref(database, `events/${id}`);
      await remove(eventRef);
      setEvents(events.filter(event => event.id !== id));
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Events Dashboard</h2>
      {events.length > 0 ? (
        <ul className="event-list">
          {events.map(event => (
            <li key={event.id} className="event-item">
              <h3>{event.name}</h3>
              <p className="event-details">Date: {event.date}</p>
              <p className="event-details">Time: {event.time}</p>
              <p className="event-details">Location: {event.location}</p>
              <div className="event-actions">
                <button onClick={() => navigate(`/edit-event/${event.id}`)}>Edit</button>
                <button onClick={() => handleDelete(event.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default EventsDashboard;



