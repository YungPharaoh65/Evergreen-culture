import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function FactsAndInfo() {
  return (
    <div> 
      
 <Navbar/>
      <h1> DIY - Information and more</h1>
      
      {/* Link component for navigation */}
      <Link to="/Dashboard">
        <button>facts and trivia</button>
      </Link> 

    </div>
  );
}

export default FactsAndInfo;
