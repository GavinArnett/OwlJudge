import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EventForm from './components/EventForm';
import Navigation from './components/Navigation';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import UserBox from './components/UserBox';

function App() {
  return (
    <Router>
      <UserBox />
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/event-form" element={<EventForm />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
