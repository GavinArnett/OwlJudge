import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../config/firebase'; // Import database
import { ref, get } from 'firebase/database'; // Import ref and get
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './Login.css';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Check if the user exists in the database
      const snapshot = await get(ref(database, `users/${user.uid}`));
      if (snapshot.exists()) {
        setIsLoggedIn(true);
      } else {
        setError('Please create an account before signing in with Google.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <button onClick={handleGoogleSignIn} className="google-button">Sign in with Google</button>
      <p>Don't have an account? <Link to="/create-user">Sign up</Link></p>
    </div>
  );
}

export default Login;
