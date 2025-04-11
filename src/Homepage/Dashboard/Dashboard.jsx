import React, { useState } from 'react'; // for toggle effects
import { Link } from "react-router-dom";
import styles from './Dashboard.module.css'; 
import Plantbox from '../Gardener-page/Gardernplant-box/Plantbox'; 
import Gardenerbox from '../Gardener-page/Gardernplant-box/Gardenerbox'; 
import CartSidebar from '../Gardener-page/Gardernplant-box/Cartpage';
 

function Dashboard() {
  
  const [showPlant, setShowPlant] = useState(true); 
  const toggleComponent = () => setShowPlant((prev) => !prev);

  return (
    <div className={styles.DashboardContainer}>
      <Link to="/Choosepath">
        <button className={styles.exitButton}>x</button>
      </Link>

      <h1>Hi (User). Find your interests...</h1>
      <CartSidebar/>
      <Link to="/Feedback">
          <button className={styles.feedback}>add your feedback here...</button>
        </Link>
        
      <div className={styles.Centerbar}>
         {/*TOOGLE BUTTON */}
      <button className={styles.acceptButton} onClick={toggleComponent}>
        {showPlant ? "Show Gardener4Hire" : "Show Plant"}
      </button>  
      
      {showPlant ? <Plantbox /> : <Gardenerbox />} 
      </div>

      <br /><br />
      
      
      <br /><br />
<br />
<div className={styles.Centerbar}>
        
      </div>
      
    </div>
  );
}

export default Dashboard;


/**
 * 
 *  https://greg.app/plant-care/golden-pothos - reference
 */