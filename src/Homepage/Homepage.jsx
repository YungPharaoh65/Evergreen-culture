import React from "react";
import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import Navbar from "./Navbar/Navbar"

function Homepage() {
  return (
    
    <div className="body">
      <Navbar/>
      <h1>Welcome to My Homepage</h1>
      
      {/* Link component for navigation */}
      <Link to="/Dashboard">
        <button>Go to Dashboard</button>
      </Link>


    </div>
  );
}

export default Homepage;
