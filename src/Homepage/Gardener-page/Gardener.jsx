import React from "react";
import { Link } from "react-router-dom";
import styles from "./Gardener.module.css";
import Adminforms from "../../Forms/Adminplantforms";
import Admingardenform from "../../Forms/Admingardenform";

function Gardener() {
  return (
    
    <div className="body">
 
      {/* Link component for navigation */}
      <Link to="/Choosepath">
        <button>x</button>
      </Link>
 
      <br /><br />

 <h1>Gardener Dashboard</h1>

 <Admingardenform />


    </div>
  );
}

export default Gardener;
