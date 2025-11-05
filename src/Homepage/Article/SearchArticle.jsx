import React from "react"; 
import { Link } from "react-router-dom";
import styles from "./SearchArticle.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

function SearchArticle() {
  return (
    <div > 
          
           
{/**SECOND SECTION */}{/**FIRST SECTION */}{/**FIRST SECTION */} 
<div className={styles.secondSection}>
  <h1 className={styles.newHybrid}>Most Popular Right Now...</h1>

 
<div className={styles.centerimgbox2}>

<Link to="/Articlepage">
<button>What makes a flower bloom</button> 
</Link>
<Link to="/Articlepage">
<button>DIY: How to make your own garden</button> 
</Link>
<Link to="/Articlepage">
<button>Benefits of gardening</button> 
</Link>
<Link to="/Articlepage">
<button>Health Benefits: why gardening will suit you</button> 
</Link>
 
</div> 

</div> 
{/**SECOND SECTION */}{/**FIRST SECTION */}{/**FIRST SECTION */}
 <h1>Recent Articles </h1>

<div className={styles.centerimgbox2}> 
{/*ARTICLE DETAILS */}
<div className={styles.centerimgbox2}>
     <div className={styles.imgbox3}>
        <div className={styles.imgbox3Text}>
         <h3>planting trees and <br />
         its benefits </h3>
         
         <p>learn about how we show information <br />
         abd how they benefit us on the <br />
         <b><u>article</u></b> site </p> 
          <p>LEARN MORE 🌳</p> 
        </div>
     </div> 
</div>
{/*ARTICLE DETAILS */}

{/*ARTICLE DETAILS */}
<div className={styles.centerimgbox2}>
     <div className={styles.imgbox3}>
        <div className={styles.imgbox3Text}>
         <h3>planting trees and <br />
         its benefits </h3>
         
         <p>learn about how we show information <br />
         abd how they benefit us on the <br />
         <b><u>article</u></b> site </p> 
          <p>LEARN MORE 🌳</p> 
        </div>
     </div> 
</div>
{/*ARTICLE DETAILS */}

{/*ARTICLE DETAILS */}
<div className={styles.centerimgbox2}>
     <div className={styles.imgbox3}>
        <div className={styles.imgbox3Text}>
         <h3>planting trees and <br />
         its benefits </h3>
         
         <p>learn about how we show information <br />
         abd how they benefit us on the <br />
         <b><u>article</u></b> site </p> 
          <p>LEARN MORE 🌳</p> 
        </div>
     </div> 
</div>
{/*ARTICLE DETAILS */}
</div>



<br /><br />
{/* BOTTOM TEXT & SOCIALS */}
          <div className={styles.secondSection2}>
            <div className={styles.logoheader}>
            have a suggestion? please add yours below<FontAwesomeIcon icon={faSeedling} color="#25D366" className={styles.FontAwesomeIcon} />
            </div>
          </div>

          <div className={styles.secondSection2}><input type="text" style={{ marginBottom: "2rem", textAlign: "center" }} /></div>

<div className={styles.secondSection2}><button style={{ marginBottom: "2rem", textAlign: "center" }} >Submit</button></div>


          <div className={styles.secondSection2}>
            <p className={styles.text}>
              ( click the word{" "}
              <b
      onClick={() => navigate("/Choosepath")}
      style={{ color: "#2c7446ff", cursor: "pointer" }}
    >
      dashboard  </b>to see your options )
   
               
            </p>
          </div>

          <div className={styles.secondSection2}>
            <FontAwesomeIcon icon={faWhatsapp} color="#25D366" className={styles.FontAwesomeIcon} />
            <FontAwesomeIcon icon={faInstagram} color="#E1306C" className={styles.FontAwesomeIcon} />
            <FontAwesomeIcon icon={faTwitter} color="#1DA1F2" className={styles.FontAwesomeIcon} />
          </div>
       
    </div> 
  );
}

export default SearchArticle;

/* 
 <p className={styles.centerText}>many types of plants to research and explore... <br />
  whether you want to search for your own or want somebody to search for you. </p>
 
*/