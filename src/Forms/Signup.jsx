// src/pages/Signup.jsx
import React, { useState, useEffect } from "react"; // ✅ Added useEffect
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "../Firebasedata/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  onAuthStateChanged, // ✅ Added onAuthStateChanged
} from "firebase/auth";
import styles from "./Signup.module.css";

const handleGoogleSignUp = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    if (user) {
      navigate("/dashboard");
    }
  } catch (error) {
    console.error(error.message);
  }
};

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState(""); // ✅ State to store logged-in email
  const navigate = useNavigate();

  // ✅ Detects if a user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await sendEmailVerification(user);
        alert("Verification email sent! Please check your inbox.");
        navigate("/check-email"); // You can change this if you want to redirect somewhere else
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <Link to="/homepage">
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
        <button type="submit" className={styles.signupBtn}>
          Sign Up
        </button>

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
