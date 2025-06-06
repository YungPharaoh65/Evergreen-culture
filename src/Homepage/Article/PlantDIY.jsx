import React from "react";
import styles from "./plantDIY.module.css";
import { Link } from "react-router-dom";
 
function PlantDIY() {
  return (
    <div > 

<Link to="/FactsAndInfo">
      <button className={styles.exitBtn}>x</button> 
</Link>
 {/**THIRD SECTION */}{/**THIRD SECTION */}{/**THIRD SECTION */}
       <h1>Indoor planting tips</h1>
    
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
{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}
<div className={styles.imgbox3}>
   <div className={styles.imgbox3Text}>
    <h3>DIY Fact: <br />Green Leafs withstand temp unto 20 degrees </h3>
    
    <p>learn more about it as you explore<br />
    other options of plants on the<br />
    <b><u>dashboard</u></b> page </p> 
    <Link to="/dashboard"> <button>click here to go to <b>dashboard</b></button> </Link> 
   </div>
</div>
{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}

{/**4 BOXES DISPLAYING */}
<div className={styles.moveimgbox4}>
<div className={styles.centerimgbox2}>
<div className={styles.imgbox4}></div> 
<div className={styles.imgbox4}></div>  
</div>
<div className={styles.centerimgbox2}>
<div className={styles.imgbox4}></div> 
<div className={styles.imgbox4}></div>  
</div>
{/**4 BOXES DISPLAYING */}

</div>



      </div>
      
  {/**THIRD SECTION */}{/**THIRD SECTION */}{/**THIRD SECTION */}


{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}
<div className={styles.fourthSection}> 
           
<div className={styles.imgbox3}>
   <div className={styles.imgbox3Text}>
    <h3>DIY Fact: <br />Green Leafs withstand temp unto 20 degrees </h3>
    
    <p>learn more about it as you explore<br />
    other options of plants on the<br />
    <b><u>dashboard</u></b> page </p> 
    <Link to="/dashboard"> <button>click here to go to <b>dashboard</b></button> </Link> 
   </div>
</div>
{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}
      
<div className={styles.imgbox3}>
   <div className={styles.imgbox3Text}>
    <h3>DIY Fact: <br />Green Leafs withstand temp unto 20 degrees </h3>
    
    <p>learn more about it as you explore<br />
    other options of plants on the<br />
    <b><u>dashboard</u></b> page </p> 
    <Link to="/dashboard"> <button>click here to go to <b>dashboard</b></button> </Link> 
   </div>
</div> 
{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}
          

</div>
{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}
{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}
<div className={styles.fourthSection}> 
           
<div className={styles.imgbox3}>
   <div className={styles.imgbox3Text}>
    <h3>DIY Fact: <br />Green Leafs withstand temp unto 20 degrees </h3>
    
    <p>learn more about it as you explore<br />
    other options of plants on the<br />
    <b><u>dashboard</u></b> page </p> 
    <Link to="/dashboard"> <button>click here to go to <b>dashboard</b></button> </Link> 
   </div>
</div>
{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}
      
<div className={styles.imgbox3}>
   <div className={styles.imgbox3Text}>
    <h3>DIY Fact: <br />Green Leafs withstand temp unto 20 degrees </h3>
    
    <p>learn more about it as you explore<br />
    other options of plants on the<br />
    <b><u>dashboard</u></b> page </p> 
    <Link to="/dashboard"> <button>click here to go to <b>dashboard</b></button> </Link> 
   </div>
</div> 
{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}
          

</div>
{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}{/**TEXT BOX */}
<br />
<br />

    </div> 
  );
}

export default PlantDIY;
