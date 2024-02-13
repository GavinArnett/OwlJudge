import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { ref, get } from 'firebase/database';
import './UserBox.css';

function UserBox() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const snapshot = await get(ref(database, `users/${user.uid}/firstName`));
          if (snapshot.exists()) {
            setFirstName(snapshot.val());
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        } finally {
          setLoading(false); // Set loading state to false after data fetching completes
        }
      } else {
        setFirstName(''); // Clear firstName if user is not logged in
        setLoading(false); // Set loading state to false if user is not logged in
      }
    });
  
    return () => unsubscribe();
  }, [location.pathname]); // Update when location.pathname changes

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  // Hide UserBox on create account or login screens
  if (location.pathname === '/create-user' || location.pathname === '/login') {
    return null;
  }

  return (
    <div className="user-box">
      {loading ? ( // Display a loading indicator while data is being fetched
        <p>Loading...</p>
      ) : user ? (
        <div className="user-info">
          <p>Welcome, {firstName}!</p>
          <div className="sign-out-container">
            <Link to="/login" onClick={handleSignOut}>Sign Out</Link>
          </div>
        </div>
      ) : (
        <div className="login-link">
          <p><Link to="/login">Login</Link> to access your account</p>
        </div>
      )}
    </div>
  );
}

export default UserBox;
