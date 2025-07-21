import React from "react";
import { Link } from "react-router-dom";
import styles from "./Morearticles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

 
function Morearticles() {
  return (

    <>
    <Link to={"/article"}><div className={styles.closeLink}>x</div></Link>
     <br />
     <br />
     <h1>More <d style={{ color:"#25D366"}}>Articles</d> & <d style={{ color:"#25D366"}}>tips </d> to explore </h1> 
 
<div className={styles.pageWrapper}>

<div className={styles.imgbox2}></div>
<div className={styles.imgbox2}></div>
<div className={styles.imgbox2}></div>
<div className={styles.imgbox2}></div>

</div>

<div className={styles.pageWrapper}>

<div className={styles.imgbox2}></div>
<div className={styles.imgbox2}></div>
<div className={styles.imgbox2}></div>
<div className={styles.imgbox2}></div>

</div>

{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/} 
 <div className={styles.fourthSection}>
  <div className={styles.logoheader}>Evergreen <FontAwesomeIcon icon={faSeedling} color="#25D366"  className={styles.FontAwesomeIcon} /></div>
 </div>

<div className={styles.fourthSection}>
 <p className={styles.text}>privacy</p><p className={styles.text}>information</p><p className={styles.text}>community</p>
            
 </div>

          <div className={styles.fourthSection}>

  <FontAwesomeIcon icon={faWhatsapp} color="#25D366"  className={styles.FontAwesomeIcon} />
           <FontAwesomeIcon icon={faInstagram} color="#E1306C"  className={styles.FontAwesomeIcon} />
       <FontAwesomeIcon icon={faTwitter} color="#1DA1F2"  className={styles.FontAwesomeIcon} />
            </div>
<br />
          <div className={styles.fourthSection}> 
            </div>
{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}

      
      
    
    </>
  );
}

export default Morearticles;
