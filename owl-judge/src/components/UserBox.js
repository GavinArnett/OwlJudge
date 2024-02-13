import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { ref, get } from 'firebase/database';
import './UserBox.css';

function UserBox() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
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
        }
      } else {
        setFirstName('');
      }
    });

    return () => unsubscribe();
  }, []);

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
      {user ? (
        <p>
          Welcome, {firstName || user.email.split('@')[0]}!
          <div className="sign-out-container">
            <Link to="/login" onClick={handleSignOut}>Sign Out</Link>
          </div>
        </p>
      ) : (
        <p>
          <Link to="/login">Login</Link> to access your account
        </p>
      )}
    </div>
  );
}

export default UserBox;
