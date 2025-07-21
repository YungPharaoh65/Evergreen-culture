import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

function Choosepath() {
  return (
    <div className={styles.container}>
      <Link to="/homepage" className={styles.closeButton}>
        <button className={styles.closeLink}>x</button>
      </Link>

      <h1>Choose who to login as:</h1>

      <div className={styles.buttonGroup}>
        <Link to="/Signup">
          <button>Go to Dashboard</button>
        </Link>

        <Link to="/adminLogin">
          <button>Admin site</button>
        </Link>
 
      </div>
    </div>
  );
}

export default Choosepath;
