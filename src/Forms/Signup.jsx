// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // Ensure Link is imported
import { auth } from '../Firebasedata/firebase';  // Adjust path based on where your component is located
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"; // Import sendEmailVerification
import styles from "./Signup.module.css";
import { signInWithPopup } from "firebase/auth";  // Import sign-in with popup
import { googleProvider } from "../Firebasedata/firebase";  // Import GoogleAuthProvider

// Google Sign Up method (Sign Up using Google instead)
const handleGoogleSignUp = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (user) {
      // Redirect to Dashboard after Google sign-in
      navigate("/dashboard");
    }
  } catch (error) {
    console.error(error.message); // Handle any errors
  }
};

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Navigation hook for redirecting

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Send verification email
        await sendEmailVerification(user);
        
        // Inform the user to check their email for verification
        alert('Verification email sent! Please check your inbox.');

        // Redirect to a page where user can be informed to verify their email (or stay on the same page)
        navigate("/check-email");
      }
      
    } catch (error) {
      console.error(error.message); // Handle errors like email already in use or weak password
      alert(error.message);  // You can also display the error in a friendly way
    }
  };

  return (
    <div className={styles.signupContainer}>

<Link to="/">
        <button className={styles.exitButton}>x</button>
      </Link>

      <form className={styles.signupForm} onSubmit={handleSignUp}>
        <h2>Create Account</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Sign Up Button */}
        <button type="submit" className={styles.signupBtn}>Sign Up</button>

        {/* Google Sign Up Button */}
        <button 
          type="button" 
          onClick={() => handleGoogleSignUp(navigate)} 
          className={styles.googleBtn}
        >
          Sign Up with Google
        </button>

        {/* Link to Login */}
        <Link to="/Login">
          <button type="button">Login Instead</button>
        </Link>
      </form>
    </div>
  );
}

export default Signup;
