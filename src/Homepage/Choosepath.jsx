import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

function Choosepath() {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.closeButton}>
        <button>x</button>
      </Link>

      <h1>Choose who to login as:</h1>

      <div className={styles.buttonGroup}>
        <Link to="/Signup">
          <button>Go to Dashboard</button>
        </Link>

        <Link to="/Admin">
          <button>Admin site</button>
        </Link>

        <Link to="/Gardener">
          <button>Garden Hire site</button>
        </Link>
      </div>
    </div>
  );
}

export default Choosepath;
