import React from "react";
import { Link } from "react-router-dom";
import styles from "./Gardener.module.css"; 

function Gardener() {
  return (
    
    <div className="body">

       
      <div className={styles.Header}>Welcome User</div>
      
      {/* Link component for navigation */}
      <Link to="/Choosepath">
        <button>x</button>
      </Link>
 
      <br /><br />

 <h1>Gardener Dashboard</h1>


    </div>
  );
}

export default Gardener;
