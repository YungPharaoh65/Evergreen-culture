import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../Firebasedata/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./Signup.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // clear previous errors

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        localStorage.setItem("userEmail", user.email);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err.message);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className={styles.signupContainer}>
      {/* Exit Button */}
      <Link to="/homepage">
        <button type="button" className={styles.exitButton} aria-label="Exit">
          ×
        </button>
      </Link>

      <form className={styles.signupForm} onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email Address"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Password"
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.signupBtn}>
          Login
        </button>

        {/* Link to Sign Up */}
        <Link to="/Signup">
          <button type="button" className={styles.signupSwitchBtn}>
            Sign up Instead
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
