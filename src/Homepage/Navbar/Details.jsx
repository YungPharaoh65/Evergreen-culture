import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Details() {
  return (
    <div>
       <Navbar/>
      <h1>Details</h1>
      
      {/* Link component for navigation */}
      <Link to="/Dashboard">
        <button>DETAILS ON US</button>
      </Link>


    </div>
  );
}

export default Details;
