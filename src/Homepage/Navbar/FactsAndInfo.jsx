import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "./FactsAndInfo.module.css";  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSeedling } from "@fortawesome/free-solid-svg-icons";


const images = [
    "https://plus.unsplash.com/premium_photo-1673141390222-2bd01b623bf3?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1637531347055-4fa8aa80c111?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1538998073820-4dfa76300194?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // from RyLsRzy9jIA
  ];


function FactsAndInfo() {
  return (
    <div> 
      
 <Navbar/>
    
    <h1> DIY - <d style={{ color:"#25D366"}}>Articles</d> and <d style={{ color:"#25D366"}}>Findings</d></h1>
      
      {/**SECOND SECTION */}{/**FIRST SECTION */}{/**FIRST SECTION */}

<div className={styles.secondSection}>
  <h1 className={styles.newHybrid}>Latest Articles</h1>

  <p className={styles.centerText}>many types of plants to research and explore... <br />
  <b>(click on image to see the topics avaliable)</b></p>
 
<div className={styles.centerimgbox2}>
      {images.map((img, index) => (
        <Link to="/article" key={index}>
          <div
            className={styles.imgbox2}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
            }}
          >
            <div className={styles.imgbox2Text}>Garden Tips</div>
          </div>
        </Link>
      ))}
    </div>
 </div>
    
{/**SECOND SECTION */}{/**FIRST SECTION */}{/**FIRST SECTION */}
  
 <div className={styles.centerimgbox2}>
  <Link to="/plantDIY">
    <div
      className={styles.imgbox2}
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1740496775561-77bd32071f27?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className={styles.imgbox2Text}>Gardening tools</div>
    </div>
  </Link>

  <Link to="/plantDIY">
    <div
      className={styles.imgbox2}
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1621272156443-c2f742b5fad1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className={styles.imgbox2Text}>What tools you need for your garden</div>
    </div>
  </Link>

  <Link to="/article">
    <div
      className={styles.imgbox2}
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1747947006527-0608b3249eae?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className={styles.imgbox2Text}>Plants that pests avoid</div>
    </div>
  </Link>
</div>

 
 <br /><br />

 
  <div className={styles.centerimgbox2}>

 <Link to="/article">
    <div
      className={styles.imgbox2}
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1676068605717-e76e2ad41b2e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className={styles.imgbox2Text}>All you need to know: Roses</div>
    </div>
  </Link>

<Link to="/article">
    <div
      className={styles.imgbox2}
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1665408511201-0492e43d99f5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className={styles.imgbox2Text}>5 essential plants to have </div>
    </div>
  </Link>

<Link to="/article">
    <div
      className={styles.imgbox2}
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1657664042448-c955b411d9d0?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className={styles.imgbox2Text}>what makes a great Gardener</div>
    </div>
  </Link>

</div>
<br /><br />
<div className={styles.fourthSection}>
  <button className={styles.homeButton}>add suggestions for articles</button>
 </div>

{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/} 
 <div className={styles.fourthSection}>
  <div className={styles.logoheader}>Evergreen <FontAwesomeIcon icon={faSeedling} color="#25D366"  className={styles.FontAwesomeIcon} /></div>
 </div>

<div className={styles.fourthSection}>
 <p className={styles.text}>its more than just a website, its a digital geography of nature</p>
 </div>

          <div className={styles.fourthSection}>

  <FontAwesomeIcon icon={faWhatsapp} color="#25D366"  className={styles.FontAwesomeIcon} />
           <FontAwesomeIcon icon={faInstagram} color="#E1306C"  className={styles.FontAwesomeIcon} />
       <FontAwesomeIcon icon={faTwitter} color="#1DA1F2"  className={styles.FontAwesomeIcon} />
            </div>
<br />
          <div className={styles.fourthSection}> 
            <p className={styles.text}>privacy</p><p className={styles.text}>articles</p><p className={styles.text}>information</p>
            </div>
{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}



    </div>
  );
}

export default FactsAndInfo;


/* 

 


/* 
 <div className={styles.positionText}>
      <div className={styles.borderimg}>  
      </div>

<div className={styles.verticalArticles}>
      <div className={styles.borderText}>
        <
        h2>The Allure of Arthurium: <br />
        guide to Flamingo Flower</>
        <p className={styles.paragraph}>jsdflrh;bgaerbgahlbgaerbgahlbr <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        bgaerbgahlahlahlahlahlahlahlahlahlahl <br />
        </p>
        <button className={styles.borderButton}>Read more 🌴</button>
        </div>  
      </div>
 </div>
 */