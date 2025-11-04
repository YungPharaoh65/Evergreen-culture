import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../Firebasedata/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import styles from "./Admin.module.css";
import AdminPage from "./Admin";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded admin credentials
    const adminEmail = "princemsimango28@gmail.com";
    const adminPassword = "28058";

    if (email === adminEmail && password === adminPassword) {
      // Mark as admin in localStorage
      localStorage.setItem("isAdmin", "true");
      // Navigate to AdminPage
      navigate("/Admin");
    } else {
      setErrorMessage("Invalid credentials or no admin permission.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
        />
        {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
        <button type="submit" className={styles.loginButton}>
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
