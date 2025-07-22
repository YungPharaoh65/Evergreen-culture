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
import Errorpage from "./Errors/Errorpage";
import NetworkWrapper from "./Errors/NetworkWrapper";
import Morearticles from "./Homepage/Article/Morearticles";
import AdminLogin from "./Homepage/Admin-page/adminLogin";
 
function App() {
  return (
    <Router>
    {/*   <NetworkWrapper>  */}  {/*AS YOU DISCONNECT, THIS WILL SHOW...*/} 
       <Routes>
        
        {/* LANDING PAGE*/}  
        <Route path="/" element={<Landingpage />} />  

<Route path="/userAccount" element={<userAccount />} />  

        {/* Public Routes */} 
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/FactsAndInfo" element={<FactsAndInfo />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/About" element={<About />} />
        <Route path="/Gardener" element={<Gardener />} />
        <Route path="/Choosepath" element={<Choosepath />} />
        {/* Public Routes */} 

        {/*SIGN UP / LOGIN PAGE*/} 
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/AdminLogin" element={<AdminLogin />} /> 
        
        {/*SIGN UP / LOGIN PAGE*/} 

        {/* PAYMENT PAGE */}
        <Route path="/Cartpage" element={<CartSidebar />} /> 
        {/* PAYMENT PAGE */}
 
        
        {/* Protected Routes: DASHBOARD */}
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

         {/* Routed to Plantdetails / Gardendetails page */}
         <Route path="/Gardendetails/:id" element={<Gardendetails />} />
         <Route path="/Plantdetails/:id" element={<Plantdetails />} /> 

         <Route path="/Plantbox" element={<Plantbox />} />
        <Route path="/Gardenbox" element={<Gardenerbox />} />
        <Route path="/Gardendetails" element={<Gardendetails />} />
        <Route path="/Plantdetails" element={<Plantdetails />} /> 
        {/* Protected Routes: TO DASHBOARD */}
        
        {/*ADMIN PAGE*/} 
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Admingardenform" element={<Admingardenform />} />
        <Route path="/Adminplantform" element={<Adminplantform />} />
         {/*ADMIN PAGE*/} 

        
         {/* user details */}
         <Route path="/UserDetails" element={<UserDetails />} />

        {/*article pages*/}
         <Route path="/article" element={<ArticlePage />} />
        <Route path="/plantDIY" element={<PlantDIY/>} />
        <Route path="/Morearticles" element={<Morearticles/>} />
        
        <Route path="/SearchArticle" element={<SearchArticle/>} />
        {/*article pages*/}
        
      </Routes>
     {/*   </NetworkWrapper> */}
    </Router>
  );
}
 
export default App;
