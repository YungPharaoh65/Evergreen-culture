import React from "react";
import { Link } from "react-router-dom";
import styles from "./Morearticles.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSeedling } from "@fortawesome/free-solid-svg-icons";;

 
function Contact() {
  return (

    <>
    <Link to={"/homepage"}><div className={styles.closeLink}>x</div></Link>
     <br />
     <br />
     <h1>Contact <d style={{ color:"#25D366"}}>Us</d>  <d style={{ color:"#25D366"}}>here </d> to explore </h1> 
     
      
    
    </>
  );
}

export default Contact;
