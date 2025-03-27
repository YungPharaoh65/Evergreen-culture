import React from "react";
import { Link } from "react-router-dom";

function FactsAndInfo() {
  return (
    <div>
      <h1> FACTS AND INFO</h1>
      
      {/* Link component for navigation */}
      <Link to="/Dashboard">
        <button>Go to Dashboard</button>
      </Link>


    </div>
  );
}

export default FactsAndInfo;
