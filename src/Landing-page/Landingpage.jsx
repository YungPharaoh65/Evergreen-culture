import React from "react"; // Added useEffect to fetch email
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import styles from "./Landingpage.module.css";

function Landingpage() {
   
  return (
    
<div className={styles.pageContainer}>
    
    {/**
    <div class="logo">
  <img src="/evergreenlogo.gif" alt="Your GIF" />
</div> 
     */}
  
  <div className={styles.secondSection}>
    <div className={styles.logoheader}>
      Evergreen <FontAwesomeIcon icon={faSeedling} color="#25D366" className={styles.FontAwesomeIcon} />
    </div>
  </div>

  <div className={styles.secondSection}>
    <p className={styles.text}>its more than just a website, its a digital geography of nature</p>
  </div>

  <div className={styles.secondSection}>
    <Link to="/homepage">
      <button className={styles.startBtn}>Let's explore </button>
    </Link>
  </div> 
 
</div>

  );
}

export default Landingpage;


/* 

 
<div className={styles.secondSection}> 
    <FontAwesomeIcon icon={faWhatsapp} color="#25D366" className={styles.FontAwesomeIcon} />
    <FontAwesomeIcon icon={faInstagram} color="#E1306C" className={styles.FontAwesomeIcon} />
    <FontAwesomeIcon icon={faTwitter} color="#1DA1F2" className={styles.FontAwesomeIcon} />
  </div>

*/