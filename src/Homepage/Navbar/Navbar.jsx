import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import CSS module 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSeedling } from "@fortawesome/free-solid-svg-icons";


function Navbar() {
  return (

    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link to="/homepage" className={styles.navLink}>Home</Link>
        </li> 
        <li>
          <Link to="/About" className={styles.navLink}>Community</Link>
        </li>
        <li>
          <Link to="/FactsAndInfo" className={styles.navLink}>Facts & Info </Link>
        </li>  
        <li> 
         <Link to="/Signup"> <button className={styles.toggleButton}><FontAwesomeIcon icon={faSeedling} color="#25D366"  className={styles.FontAwesomeIcon} />
                          </button></Link>
        </li>
        
      </ul>
    </nav>

    
  );
}

export default Navbar;
