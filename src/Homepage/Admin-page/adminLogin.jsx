import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebasedata/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import styles from "./Admin.module.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Allowed credentials
  const allowedEmail = "princemsimango27@gmail.com";
  const allowedPassword = "28058";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Check credentials
    if (email.trim() !== allowedEmail || password !== allowedPassword) {
      setError("Invalid email or password.");
      return;
    }

    try {
      // Log login event in Firestore
      await addDoc(collection(db, "adminLogins"), {
        email,
        loginAt: serverTimestamp(),
      });

      // Navigate to admin page
      navigate("/admin");
    } catch (err) {
      console.error("Failed to log admin login:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
          autoComplete="current-password"
        />
        {error && <p className={styles.errorText}>{error}</p>}
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
