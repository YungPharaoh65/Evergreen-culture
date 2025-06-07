import React, { useState, useEffect } from 'react';
import { Link, useNavigate  } from "react-router-dom";  
import Navbar from "./Navbar/Navbar"; 
import styles from "./Homepage.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


{/*ADD A CHATBOT GUIDE TO HELP NAVIGATE AS WELL */}

const images = [
    "https://plus.unsplash.com/premium_photo-1673141390222-2bd01b623bf3?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1637531347055-4fa8aa80c111?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1538998073820-4dfa76300194?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // from RyLsRzy9jIA
  ];

  const secondImages = [
    "https://plus.unsplash.com/premium_photo-1665311515452-a9f54c4266c9?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1681140560805-2d81ba3118bd?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1653515906294-3ab029713586?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1679278880193-68c924cdf0d0?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  // Split images into 2 rows (2 per row)
  const rows = [];
  for (let i = 0; i < secondImages.length; i += 2) {
    rows.push(secondImages.slice(i, i + 2));
  }


function Homepage() {

  const navigate = useNavigate();

  const [showTooltip, setShowTooltip] = useState(false);
  
    useEffect(() => {
      const visited = localStorage.getItem("signupTooltipShown");
      if (!visited) {
        setShowTooltip(true);
        localStorage.setItem("signupTooltipShown", "true");
  
        setTimeout(() => setShowTooltip(false), 4500);
      }
    }, []);
  
    
    
  
  return ( 

    <div className={styles.body}>
      {/* Overlay when tooltip is visible */}
            {showTooltip && <div className={styles.darkOverlay}></div>}
       
      <Navbar/>
      
      {/**FIRST SECTION */}{/**FIRST SECTION */}{/**FIRST SECTION */}
       <h1> 
        <d style={{ color:"#25D366"}} >Discover</d> and Elavate Your <br />Interests in <d style={{ color:"#25D366"}} >Gardening</d> <br />and <d style={{ color:"#25D366"}} >Plantation</d> </h1>
      <div className={styles.imgbox1}></div>

      <p className={styles.positionOne}>explore the possibilities of <d value="">plantation</d> and gardening <br />
      made easier with Evergreen-culture
      <br />
      Join us to explore more</p>
       
      {/* Link component for navigation */}

<div className={styles.positionOne}>
       <Tippy content="Click here to sign up!"
              visible={showTooltip}
              theme="dark"
              placement="bottom"
              className={styles.TippyBtn}>
                
          <button
            className={styles.homeButton}
            onClick={() => navigate('/Choosepath')}
          >
            Get Started with us
          </button>
        </Tippy>

        </div>

      {/**FIRST SECTION */}{/**FIRST SECTION */}{/**FIRST SECTION */}

 <li>
            <button onClick={() => localStorage.removeItem("signupTooltipShown")}>
              Reset Tooltip Storage
            </button>
          </li>
<br /><br /><br />
      {/**SECOND SECTION */}{/**FIRST SECTION */}{/**FIRST SECTION */}

<div className={styles.secondSection}>
  <h1 className={styles.newHybrid}>New Hybrid</h1>

  <p className={styles.centerText}>many types of plants to research and explore... <br />
  whether you want to search for your own or want somebody to search for you. </p>

<div className={styles.centerimgbox2}>
      {images.map((url, index) => (
        <div
          key={index}
          className={styles.imgbox2}
          style={{ backgroundImage: `url(${url})` }}
        ></div>
      ))}
    </div>

</div>
{/**SECOND SECTION */}{/**FIRST SECTION */}{/**FIRST SECTION */}



 {/**THIRD SECTION */}{/**THIRD SECTION */}{/**THIRD SECTION */}
       <h1>Everything <d style={{ color:"#25D366"}}>green</d> </h1>
    
    <div className={styles.positionOne}>
      <p >explore the possibilities of plantation and gardening <br />
      made easier with Evergreen-culture
      <br />
      Join us to explore more</p>
      <br />
      <div className={styles.centerimgbox3}>
<button className={styles.customizeBtn}>Recent activity</button>
<button className={styles.customizeBtn}>Planting trees</button>
<button className={styles.customizeBtn}>indigenous types</button>
</div>

<br /> 
<div className={styles.imgbox3}>
   <div className={styles.imgbox3Text}>
    <h3>planting trees and <br />
    its benefits </h3>
    
    <p>learn about how we show information <br />
    abd how they benefit us on the <br />
    <b><u>article</u></b> site </p> 
    <Link to="/FactsAndInfo"><p>LEARN MORE 🌳</p> </Link> 
     

     
   </div>
</div>

<div className={styles.moveimgbox4}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.centerimgbox2}>
          {row.map((url, imgIndex) => (
            <div
              key={imgIndex}
              className={styles.imgbox4}
              style={{ backgroundImage: `url(${url})` }}
            ></div>
          ))}
        </div>
      ))}
    </div>


      </div>
      
  {/**THIRD SECTION */}{/**THIRD SECTION */}{/**THIRD SECTION */}

<br /><br /> <br /><br />
   {/**FOURTH SECTION */}{/**FOURTH SECTION */}{/**FOURTH SECTION */}

   <div className={styles.thirdSection}>
       <h1>Explore your <d style={{ color:"#25D366"}}>options</d> <br />to find what you like<br />by choice</h1>
      <div className={styles.imgbox1}></div>

      <p className={styles.positionOne}>explore the possibilities of hiring options or DIYs...<br />
      made easier with Evergreen-culture
      <br />
      click the button below to explore more</p>
       
      {/* Link component for navigation */}
      <Link to="/Choosepath">
        <button className={styles.homeButton}>Get Started with us</button>
      </Link>
</div>

      {/**FOURTH SECTION */}{/**FOURTH SECTION */}{/**FOURTH SECTION */}

<br /> 
<br /><br /><br /><br />
{/**Footer */}{/**Footer */}{/**Footer */}{/**Footer */}
<footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.section}>
          <h3><FontAwesomeIcon icon={faSeedling} color="#25D366"  className={styles.FontAwesomeIcon} />About Us </h3>
          <p>find out alot on our website here: Evergreen is a website where we host more than just basic infomration on plants, <br />
           its a way to learn more, engage with people and have services. It is a multi-platformed, system that offers 
           users multiple options and provides a solution to all things green.</p>
        </div>
         
        <div className={styles.sectionTwo}>
          <h3>Contact</h3>
          <p>Email: info@Evergreen.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} Evergreen. All rights reserved.</p>
      </div>
    </footer>
{/**Footer */}{/**Footer */}{/**Footer */}{/**Footer */}

      </div>
  );
}

export default Homepage;
