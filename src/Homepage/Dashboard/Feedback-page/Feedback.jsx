import React from 'react';
import { Link } from "react-router-dom";
import styles from "./Feedback.module.css";

function Feedback() {
  return (
    <div> {// start of div
        
        }


<Link to="/Dashboard">
        <button >Go back to Dashboard</button>
      </Link>

      <Link to="/Gardendetails">
        <button >Go back to Gardendetails</button>
      </Link>
 
      <div className={styles.positionContent}>
      <div className={styles.reviewBox}>
        <h1>5.O</h1>
         </div>

      <div className={styles.reviewText}>

        <div className={styles.alignbar}>
<p className={styles.text}>5 ⭐</p>
<div className={styles.bar}></div>
<p>25</p>
</div>

<div className={styles.alignbar}>
<p className={styles.text}>4 ⭐</p>
<div className={styles.bar}></div>
<p>25</p>
</div>

<div className={styles.alignbar}>
<p className={styles.text}>3 ⭐</p>
<div className={styles.bar}></div>
<p>25</p>
</div>

<div className={styles.alignbar}>
<p className={styles.text}>2 ⭐</p>
<div className={styles.bar}></div>
<p>25</p>
</div>

<div className={styles.alignbar}>
<p className={styles.text}>1 ⭐</p>
<div className={styles.bar}></div>
<p>25</p>
</div>
 
 <div className={styles.reviewContent}>
  <h3>12 Reviews -</h3>
{/**REVIEW BAR */}{/**REVIEW BAR */}{/**REVIEW BAR */}
 {/**REVIEW BAR */}{/**REVIEW BAR */}{/**REVIEW BAR */}
 
  <div className={styles.reviewParagraph}>
    <h3 className={styles.username}>Username: </h3> 
    <div className={styles.text}>⭐⭐⭐⭐⭐</div>

    <p className={styles.moveComment}>jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb
      <br />jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb
      <br />jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb
      <br />jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb.
      <br />
    </p>
  </div>
  {/**REVIEW BAR */}{/**REVIEW BAR */}{/**REVIEW BAR */}
 {/**REVIEW BAR */}{/**REVIEW BAR */}{/**REVIEW BAR */}

{/**REVIEW BAR */}{/**REVIEW BAR */}{/**REVIEW BAR */}
 {/**REVIEW BAR */}{/**REVIEW BAR */}{/**REVIEW BAR */}
 
 <div className={styles.reviewParagraph}>
    <h3 className={styles.username}>Prince Mpho Msimango: </h3> 
    <div className={styles.text}>⭐⭐⭐⭐⭐</div>

    <p className={styles.moveComment}>jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb
      <br />jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb
      <br />jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb
      <br />jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb.
      <br />
    </p>
  </div>
  {/**REVIEW BAR */}{/**REVIEW BAR */}{/**REVIEW BAR */}
 {/**REVIEW BAR */}{/**REVIEW BAR */}{/**REVIEW BAR */}

 </div> 
 
 
      </div>

      </div>

      
    </div>// end of of div  
  );
}

export default Feedback;
