import React, { useState, useEffect } from "react"; // Added useEffect to fetch email
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Plantbox from "../Gardener-page/Gardernplant-box/Plantbox";
import Gardenerbox from "../Gardener-page/Gardernplant-box/Gardenerbox";
import CartSidebar from "../Gardener-page/Gardernplant-box/Cartpage";

function Dashboard() {
  const [showPlant, setShowPlant] = useState(true);
  const [userEmail, setUserEmail] = useState(""); // State to hold user's email

  // Get the email from localStorage on component mount
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    setUserEmail(email || "User"); // Fallback if no email is found
  }, []);

  const toggleComponent = () => setShowPlant((prev) => !prev);

  return (
    
    <div className={styles.DashboardContainer}>
      <Link to="/Choosepath">
        <button className={styles.exitButton}>x</button>
      </Link>

      <h3>Hi {userEmail}. Find your interests...</h3> {/* Display user's email */}

  

      <CartSidebar />



      <div className={styles.Centerbar}>
        {/* TOGGLE BUTTON */}
        <button className={styles.acceptButton} onClick={toggleComponent}>
          {showPlant ? "Show Gardener4Hire" : "Show Plant"}
        </button>

        {showPlant ? <Plantbox /> : <Gardenerbox />}
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <div className={styles.Centerbar}></div>
    </div>
  );
}

export default Dashboard;
