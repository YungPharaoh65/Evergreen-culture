import React from "react";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <h1>Welcome to My Homepage</h1>
      
      {/* Link component for navigation */}
      <Link to="/Dashboard">
        <button>Go to Dashboard</button>
      </Link>


    </div>
  );
}

export default Homepage;
