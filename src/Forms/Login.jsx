// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from '../Firebasedata/firebase';  // Import Firebase auth
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";  // Firebase sign-in methods
import { googleProvider } from "../Firebasedata/firebase";  // Import GoogleAuthProvider
import styles from "./Signup.module.css";  // Use the same styles as Signup

const Login = () => {
  const [email, setEmail] = useState("");   // State for email
  const [password, setPassword] = useState("");   // State for password
  const [error, setError] = useState("");  // Error state to store error message
  const navigate = useNavigate();   // Navigation hook for routing

  // Google Sign-In method (Sign in using Google)
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);   // Google sign-in
      const user = result.user;

      if (user) {
        navigate("/dashboard");  // Redirect to dashboard if user is authenticated
      }
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
      console.error(error.message);  // Handle errors if any
    }
  };

  // Email/Password Login method
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        navigate("/dashboard");  // Redirect to dashboard if login is successful
      }
    } catch (error) {
      setError("Invalid email or password.");  // Display error message
    }
  };

  return (
    <div className={styles.signupContainer}>
      
      <Link to="/">
        <button className={styles.exitButton}>x</button>
      </Link>

      <form className={styles.signupForm} onSubmit={handleLogin}>
        <h2>Login</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}   // Handle email input change
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}   // Handle password input change
          required
        />

        {/* Error message */}
        {error && <p className={styles.error}>{error}</p>}  {/* Error display */}

        {/* Login Button */}
        <button type="submit" className={styles.signupBtn}>Login</button>

        {/* Google Sign-In Button */}
        <button
          type="button"
          className={styles.googleBtn}
          onClick={handleGoogleSignIn}
        >
          <img src="/google-icon.png" alt="Google" />
          Sign in with Google instead
        </button>
      </form>
    </div>
  );
};

export default Login;
