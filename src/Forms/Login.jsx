import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from '../Firebasedata/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../Firebasedata/firebase";
import styles from "./Signup.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user) {
        localStorage.setItem("userEmail", user.email); // ✅ Save email
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
      console.error(error.message);
    }
  };

  // Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        localStorage.setItem("userEmail", user.email); // ✅ Save email
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <Link to="/">
        <button className={styles.exitButton}>x</button>
      </Link>

      <form className={styles.signupForm} onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.signupBtn}>Login</button>

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
