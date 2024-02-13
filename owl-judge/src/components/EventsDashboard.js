import React, { useState, useEffect } from 'react';
import { database } from '../config/firebase';
import { ref, onValue, remove } from 'firebase/database';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function EventsDashboard() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const eventsRef = ref(database, 'events');
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched data:", data); // Debug: Log raw fetched data
      const loadedEvents = data ? Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })) : [];
      console.log("Transformed events:", loadedEvents); // Debug: Log transformed events
      setEvents(loadedEvents);
    });
  }, []);
  

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const eventRef = ref(database, `events/${id}`);
      await remove(eventRef);
      // Update events state to reflect deletion
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const handleEdit = (id) => {
    // Navigate to the edit event form with the event ID
    navigate(`/edit-event/${id}`);
  };

  return (
    <div>
      <h2>Events Dashboard</h2>
      {events.length > 0 ? (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <h3>{event.name}</h3>
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              <p>Location: {event.location}</p>
              <button onClick={() => navigate(`/edit-event/${event.id}`)}>Edit</button>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
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


