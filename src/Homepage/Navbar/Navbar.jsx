import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


function Navbar() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("signupTooltipShown");
    if (!visited) {
      setShowTooltip(true);
      localStorage.setItem("signupTooltipShown", "true");

      setTimeout(() => setShowTooltip(false), 4500);
    }
  }, []);


  const navigate = useNavigate();
   
  return (
    <>
      {/* Overlay when tooltip is visible */}
      {showTooltip && <div className={styles.darkOverlay}></div>}

      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li>
            <Link to="/homepage" className={styles.navLink}>Home</Link>
          </li>
          <li>
            <Link to="/About" className={styles.navLink}>Community</Link>
          </li>
          <li>
            <Link to="/FactsAndInfo" className={styles.navLink}>Facts & Info</Link>
          </li>
         
          <li>
            <Tippy
              content="Click on this icon to sign up to find out more"
              visible={showTooltip}
              theme="dark"
              placement="bottom" 
            >
               
                <button className={styles.toggleButton} onClick={() => navigate('/Signup')}>
                  <FontAwesomeIcon icon={faSeedling} color="#25D366" className={styles.FontAwesomeIcon} />
                </button>
              
            </Tippy>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
