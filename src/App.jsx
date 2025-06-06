import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Dashboard from "./Homepage/Dashboard/Dashboard";
import Feedback from "./Homepage/Dashboard/Feedback-page/Feedback";
import FactsAndInfo from "./Homepage/Navbar/FactsAndInfo";
import Details from "./Homepage/Navbar/Details";
import About from "./Homepage/Navbar/About";
import Admin from "./Homepage/Admin-page/Admin";
import Gardener from "./Homepage/Gardener-page/Gardener";
import Signup from "./Forms/Signup";
import Login from "./Forms/Login";
import ProtectedRoute from "./Firebasedata/ProtectedRoute"; // Import your ProtectedRoute if needed

import Choosepath from "./Homepage/Choosepath";
import Plantbox from "./Homepage/Gardener-page/Gardernplant-box/Plantbox";
import Gardenerbox from "./Homepage/Gardener-page/Gardernplant-box/Gardenerbox";
import CartSidebar from "./Homepage/Gardener-page/Gardernplant-box/Cartpage";
import Gardendetails from "./Homepage/Dashboard/GardenPlantdetails/Gardendetails";
import Plantdetails from "./Homepage/Dashboard/GardenPlantdetails/Plantdetails";
import Admingardenform from "./Forms/Admingardenform";
import Adminplantform from "./Forms/Admingardenform";
import UserDetails from "./Homepage/Dashboard/userAccount/userDetails"; 
import ArticlePage from "./Homepage/Article/Articlepage"; 
import PlantDIY from "./Homepage/Article/PlantDIY";
import SearchArticle from "./Homepage/Article/SearchArticle"; 
import Landingpage from "./Landing-page/Landingpage";
 
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes you are only allowed to mention the route once*/}
         <Route path="/" element={<Landingpage />} />
       
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/FactsAndInfo" element={<FactsAndInfo />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/About" element={<About />} />
        <Route path="/Gardener" element={<Gardener />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> 

        {/* Make sure this is pointing to the Login component */}
        <Route path="/Cartpage" element={<CartSidebar />} /> 
        {/* Make sure this is pointing to the Login component */}

        <Route path="/Choosepath" element={<Choosepath />} />
        <Route path="/Plantbox" element={<Plantbox />} />
        <Route path="/Gardenbox" element={<Gardenerbox />} />
        <Route path="/Gardendetails" element={<Gardendetails />} />
        <Route path="/Plantdetails" element={<Plantdetails />} />
        
        {/* Protected Routes: Sign Up Page */}
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Admingardenform" element={<Admingardenform />} />
        <Route path="/Adminplantform" element={<Adminplantform />} />
         
         {/* Routed to Plantdetails / Gardendetails page */}
         <Route path="/Gardendetails/:id" element={<Gardendetails />} />
         <Route path="/Plantdetails/:id" element={<Plantdetails />} />

         {/* user details */}
         <Route path="/UserDetails" element={<UserDetails />} />

        {/*article pages*/}
         <Route path="/article" element={<ArticlePage />} />
        <Route path="/plantDIY" element={<PlantDIY/>} />
        <Route path="/SearchArticle" element={<SearchArticle/>} />
        

      </Routes>
    </Router>
  );
}
//  add other parts using this (between <Routes>):
//<Route path="/" element={<Homepage />} />

export default App;
