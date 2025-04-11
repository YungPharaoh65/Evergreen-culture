import React from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css"; 

function Admin() {
  return (
    
    <div className="body">

       
      <h1>Welcome User</h1>
      
      {/* Link component for navigation */}
      <Link to="/Choosepath">
        <button>x</button>
      </Link>

      

      <br /><br />

 <h1>Admin site</h1>


    </div>
  );
}

export default Admin;
