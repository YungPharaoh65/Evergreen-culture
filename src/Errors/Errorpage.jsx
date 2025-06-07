import React from "react"; // Added useEffect to fetch email 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from "./Errorpage.module.css";
 
function Errorpage() {
   
  return (
    
<div className={styles.pageContainer}>
    
    {/**
    <div class="logo">
  <img src="/evergreenlogo.gif" alt="Your GIF" />
</div> 
     */}
  
  <div className={styles.secondSection}>
    <div className={styles.logoheader}>
      
     <img src="/demoimg.jpg" alt="My GIF" />

    </div>
  </div>
  
  <div className={styles.secondSection}>
    <p className={styles.text}>just found yourself on a <b>404 error</b> <br />dont worry man, just check your network or click on refresh </p>
  </div>

 <div className={styles.secondSection}>

 <FontAwesomeIcon icon={faWhatsapp} color="#25D366"  className={styles.FontAwesomeIcon} />
          <FontAwesomeIcon icon={faInstagram} color="#E1306C"  className={styles.FontAwesomeIcon} />
      <FontAwesomeIcon icon={faTwitter} color="#1DA1F2"  className={styles.FontAwesomeIcon} />
          </div>
 
 
</div>

  );
}

export default Errorpage;


/* 

 
<div className={styles.secondSection}> 
    <FontAwesomeIcon icon={faWhatsapp} color="#25D366" className={styles.FontAwesomeIcon} />
    <FontAwesomeIcon icon={faInstagram} color="#E1306C" className={styles.FontAwesomeIcon} />
    <FontAwesomeIcon icon={faTwitter} color="#1DA1F2" className={styles.FontAwesomeIcon} />
  </div>

*/