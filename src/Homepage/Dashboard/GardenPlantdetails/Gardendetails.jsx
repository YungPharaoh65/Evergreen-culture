import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom"; 
import styles from "./Gardenplantdetails.module.css"; 
import CartSidebar from "../../Gardener-page/Gardernplant-box/Cartpage";  
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebasedata/firebase"; // Adjust as needed

function Gardendetails() {
  const [gardener, setGardener] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const reviewSectionRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchGardener = async () => {
      try {
        const docRef = doc(db, "gardeners", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGardener(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching gardener:", error);
      }
    };

    fetchGardener();
  }, [id]);

  return (
    <div className={styles.body}> 
      <CartSidebar />

      {/* Link component for navigation */}
      <Link to="/Dashboard"><button className={"exitButton"}>x</button></Link> 

      <div className={styles.border}></div>

      <div className={styles.border2}> 
        <div className={styles.subtopicsmove}>
          <h2>{gardener?.fullName || "Loading..."}</h2> 
          <div className={styles.ratingheading}>
            rating: {gardener?.rating ? `⭐`.repeat(gardener.rating) : "⭐⭐⭐⭐⭐"}
          </div>
        </div>

        <div className={styles.subtopicsmove}> 
          {gardener?.filters?.map((tag, i) => (
            <button key={i} className={styles.subheadings2}>{tag}</button>
          ))}
        </div> 

          <h3>About Me</h3>
<p className={styles.paragraph}>
  {gardener?.aboutMe?.trim()
    ? gardener.aboutMe
    : "The gardener has not provided a bio yet."}
</p>
        <button className={styles.cartbutton}>Hire me for service</button>

        <button
          className={styles.btn}
          onClick={() => {
            setShowReviews((prev) => !prev);
            setTimeout(() => {
              reviewSectionRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
        >
          Show Reviews
        </button>
      </div> 

<br />
<div className={styles.horizontal}>
      <div className={styles.subtopicsmove}> 
          {gardener?.filters?.map((tag, i) => (
            <button key={i} className={styles.subheadings2}>{tag}</button>
          ))}
        </div> 

      <br /><br />

      <div className={styles.subtopicsmove}> 
        <button className={styles.subheadings22}>
          Available: {gardener?.availability || "Monday - Friday"}
        </button>
        {gardener?.services?.map((service, i) => (
          <button key={i} className={styles.subheadings2}>{service}</button>
        ))}
        
        </div>

        <br />
        <br />

      </div>

      <br /><br /><br /><br /><br />
      {showReviews && (
        <div ref={reviewSectionRef} className={styles.reviewDropdown}>
          {/* FEEDBACK SECTION */}

          <div className={styles.positionContent2}>
            <div className={styles.reviewBox}>
              <h1>5.0</h1>
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

                <div className={styles.reviewParagraph}>
                  <h3 className={styles.username}>Username: </h3>
                  <div className={styles.text}>⭐⭐⭐⭐⭐</div>
                  <p className={styles.moveComment}>
                    jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb<br />
                    jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb<br />
                    jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb<br />
                    jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb.
                  </p>
                </div>

                <div className={styles.reviewParagraph}>
                  <h3 className={styles.username}>Prince Mpho Msimango: </h3>
                  <div className={styles.text}>⭐⭐⭐⭐⭐</div>
                  <p className={styles.moveComment}>
                    jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb<br />
                    jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb<br />
                    jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb<br />
                    jhbkjhbkjhbkjhhbkjhbhljhbljhbjhbkjhbkjbhljhbljhbjhbkjhhbkjhhbkjhbkjbhljhbljhb.
                  </p>
                </div> 
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gardendetails;
