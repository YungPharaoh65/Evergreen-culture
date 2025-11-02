import React from "react";
import { Link } from "react-router-dom";
import styles from "./Morearticles.module.css";
import SearchArticle from "./SearchArticle";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSeedling } from "@fortawesome/free-solid-svg-icons";


 
function Morearticles() {
  return (

    <>
    <Navbar/>
    <br />
     <br />
     <h1>More <d style={{ color:"#25D366"}}>Articles</d> & <d style={{ color:"#25D366"}}>tips </d> to explore </h1>
     
     <SearchArticle/>

    </>
  );
}

export default Morearticles;
