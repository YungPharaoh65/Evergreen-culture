import React from "react"; 
import { Link } from "react-router-dom";
import styles from "./SearchArticle.module.css";

function SearchArticle() {
  return (
    <div > 
        <Link to="/FactsAndInfo">
        <button>x</button>
        </Link>  
           
{/**SECOND SECTION */}{/**FIRST SECTION */}{/**FIRST SECTION */} 
<div className={styles.secondSection}>
  <h1 className={styles.newHybrid}>Popular Articles</h1>

 
<div className={styles.centerimgbox2}>

<Link to="/article">
<button>plantation</button> 
</Link>
<Link to="/article">
<button>plantation</button> 
</Link>
<Link to="/article">
<button>plantation</button> 
</Link><Link to="/article">
<button>plantation</button> 
</Link>
 
</div> 

</div> 
{/**SECOND SECTION */}{/**FIRST SECTION */}{/**FIRST SECTION */}
 <h1>Recent Articles </h1>

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
{/*ARTICLE DETAILS */}{/*ARTICLE DETAILS */}
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
{/*ARTICLE DETAILS */}{/*ARTICLE DETAILS */}
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
  );
}

export default SearchArticle;

/* 
 <p className={styles.centerText}>many types of plants to research and explore... <br />
  whether you want to search for your own or want somebody to search for you. </p>
 
*/