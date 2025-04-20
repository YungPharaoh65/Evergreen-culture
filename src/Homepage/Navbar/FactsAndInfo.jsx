import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "./FactsAndInfo.module.css";

function FactsAndInfo() {
  return (
    <div> 
      
 <Navbar/>
      <h1> DIY - Articles</h1>
      
      {/* Link component for navigation */}
      <Link to="/Dashboard">
        <button>Dashboard</button>
      </Link> 

      <Link to="/Plantdetails">
        <button>Back to Plantdetails</button>
      </Link> 

      <div className={styles.positionText}>
      <div className={styles.borderimg}> 
        
      </div>

      <div className={styles.borderText}>
        <h2>The Allure of Arthurium: <br />
        guide to Flamingo Flower</h2>
        <p className={styles.paragraph}>jsdflrh;bgaerbgahlbgaerbgahlbr <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        </p>
        <button className={styles.borderButton}>Read more 🌴</button>
        </div>
        
       
       <div className={styles.borderimg}> 
        
      </div>

      <div className={styles.borderText}>
        <h2>Humidity</h2>
        <p className={styles.paragraph}>jsdflrh;bgaerbgahlbgaerbgahlbr <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        </p>
        <button className={styles.borderButton}>Read more 🌴</button>
        </div>
      </div>

      /** */

      <div className={styles.positionText}>
      <div className={styles.borderimg}> 
        
      </div>

      <div className={styles.borderText}>
        <h2>The Allure of Arthurium: <br />
        guide to Flamingo Flower</h2>
        <p className={styles.paragraph}>jsdflrh;bgaerbgahlbgaerbgahlbr <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        </p>
        <button className={styles.borderButton}>Read more 🌴</button>
        </div>
        
       
       <div className={styles.borderimg}> 
        
      </div>

      <div className={styles.borderText}>
        <h2>Humidity</h2>
        <p className={styles.paragraph}>jsdflrh;bgaerbgahlbgaerbgahlbr <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        </p>
        <button className={styles.borderButton}>Read more 🌴</button>
        </div>
      </div>
 

    </div>
  );
}

export default FactsAndInfo;
