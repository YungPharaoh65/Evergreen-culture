// src/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";

//Google access (email and password ) WORKING !!!!
const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;  // Check if the user is authenticated
  return user ? children : <Navigate to="/signup" />;
};



export default ProtectedRoute;
