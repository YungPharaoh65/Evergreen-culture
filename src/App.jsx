import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './Homepage/Homepage'; 
import Dashboard from './Dashboard/Dashboard';
import Feedback from './Feedback-page/Feedback'; 
import About from './Feedback-page/Feedback'; 
import Details from './Feedback-page/Feedback';


function App() {
  return (
    

    <Router> 

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Feedback" element={<Feedback />} />
        
        
        </Routes> 
    </Router>

  );
}
//  add other parts using this (between <Routes>):
 //<Route path="/" element={<Homepage />} />
        
export default App;
