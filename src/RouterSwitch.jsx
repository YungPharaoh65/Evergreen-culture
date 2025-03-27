import React from "react";
import { Routes, Route, HashRouter} from "react-router-dom";
import App from "./App";
import Dashboard from "./Route-Navbar/Navbar";
import Sales from "./Route-Navbar/Sales";
import Trackinglist from "./Route-Navbar/Trackinglist";
import Profile from "./Route-Navbar/Profile";


const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes> 
        <Route path="/" element={<App />} /> {/* This link is the homepage bcos it's the first one you will see */}
         
      </Routes>
    </HashRouter>
  );
};

/**
 * 
 *   <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/trackinglist" element={<Trackinglist />} />
        <Route path="/profile" element={<Profile />} />
 */


export default React.memo(RouteSwitch);