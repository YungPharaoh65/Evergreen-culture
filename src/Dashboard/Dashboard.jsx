import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css"; 

// Import as a module
// so that the css reflects on different pages
// to ensure that you have unique pages

function Dashboard() {
  return (
    <div  className={styles.dashboardContainer}> {/** to ensure that you have unique pages*/} 
<Link to="/">
        <button>Go to Homepage</button>
      </Link>

      <h1>MY DASHBOARD</h1>

      <Link to="/Dashboard">
        <button>Go to Plant Section</button>
      </Link>

      <br /><br />

      <Link to="/Dashboard">
        <button> GARDNER Section</button>
      </Link>

      <br /><br /><br />
      <Link to="/Feedback">
        <button> Gain more feedbck here</button>
      </Link>
    </div>
  );
}

export default Dashboard;
