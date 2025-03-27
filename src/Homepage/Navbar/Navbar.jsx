import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import CSS module

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/" className={styles.navLink}>Home</Link>
        </li>
        <li>
          <Link to="/Details" className={styles.navLink}>Details</Link>
        </li>
        <li>
          <Link to="/About" className={styles.navLink}>About</Link>
        </li>
        <li>
          <Link to="/FactsAndInfo" className={styles.navLink}>Facts & Info</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
