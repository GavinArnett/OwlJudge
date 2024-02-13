import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, database } from '../config/firebase';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router';
import './CreateUser.css';

function CreateUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to the database
      await set(ref(database, `users/${user.uid}`), {
        email: email,
        firstName: firstName,
        lastName: lastName
      });

      // Clear form fields and errors
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setEmailError('');
      setPasswordError('');
      nav('/');
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Retrieve user's profile information
      const displayName = user.displayName;
      const [firstName, lastName] = displayName.split(' ');

      // Save additional user data to the database
      await set(ref(database, `users/${user.uid}`), {
        email: user.email,
        firstName: firstName,
        lastName: lastName
      });
      nav('/');
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setEmailError('');
    } else {
      setEmailError('Please enter a valid email address.');
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="create-user">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>
        <button type="submit" className="create-account-button">Create Account</button>
      </form>
      <button onClick={handleGoogleSignIn} className="google-button">Sign up with Google</button>
    </div>
  );
}

export default CreateUser;
