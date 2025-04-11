import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './Homepage/Homepage'; 
import Dashboard from './Homepage/Dashboard/Dashboard';
import Feedback from './Homepage/Dashboard/Feedback-page/Feedback';  
import FactsAndInfo from './Homepage/Navbar/FactsAndInfo';
import Details from './Homepage/Navbar/Details'
import About from './Homepage/Navbar/About';
import Admin from './Homepage/Admin-page/Admin'; 
import Gardener from './Homepage/Gardener-page/Gardener';
import Signup from './Forms/Signup';
import Login from './Forms/Login';
import ProtectedRoute from './Firebasedata/ProtectedRoute';  // Import your ProtectedRoute if needed

import Choosepath from './Homepage/Choosepath'; 
import Plantbox from './Homepage/Gardener-page/Gardernplant-box/Plantbox';
import Gardenerbox from './Homepage/Gardener-page/Gardernplant-box/Gardenerbox';
import CartSidebar from './Homepage/Gardener-page/Gardernplant-box/Cartpage';

function App() {
  return ( 

     <Router> 
 
<Routes>
  {/* Public Routes you are only allowed to mention the route once*/}
  <Route path="/" element={<Homepage />} />
  <Route path="/Feedback" element={<Feedback />} />
  <Route path="/FactsAndInfo" element={<FactsAndInfo />} />
  <Route path="/Details" element={<Details />} />
  <Route path="/About" element={<About />} />
  <Route path="/Gardener" element={<Gardener />} />
  <Route path="/Signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />  {/* Make sure this is pointing to the Login component */}
  <Route path="/Cartpage" element={<CartSidebar />} />  {/* Make sure this is pointing to the Login component */}
  
  
   <Route path="/Choosepath" element={<Choosepath />} />
   <Route path="/Plantbox" element={<Plantbox />} />
   <Route path="/Gardenbox" element={<Gardenerbox />} />
   
   <Route  path="/Dashboard" element={  <Dashboard />  } /> 
  
        
        
  {/* Protected Routes: Sign Up Page */}
  <Route  path="/Dashboard" element={  <ProtectedRoute><Dashboard /></ProtectedRoute> } /> 
  <Route path="/Admin" element={<Admin />} />

</Routes> 
    </Router>
  );
}
//  add other parts using this (between <Routes>):
 //<Route path="/" element={<Homepage />} />
        
export default App;
