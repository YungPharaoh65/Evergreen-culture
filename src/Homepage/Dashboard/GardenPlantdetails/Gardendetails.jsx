import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Gardenplantdetails.module.css";
import CartSidebar from "../../Gardener-page/Gardernplant-box/Cartpage";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../Firebasedata/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Gardendetails() {
  const [gardener, setGardener] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  const [comment, setComment] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [user, setUser] = useState(null); // 🔑 Logged-in user state
  const reviewSectionRef = useRef(null);
  const { id } = useParams();

  // 🔐 Listen for logged-in user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  // Fetch gardener by ID
  useEffect(() => {
    const fetchGardener = async () => {
      try {
        const docRef = doc(db, "gardeners", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGardener({ ...docSnap.data(), id: docSnap.id });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching gardener:", error);
      }
    };

    if (id) fetchGardener();
  }, [id]);

  // Fetch feedback
  useEffect(() => {
    const fetchFeedback = async () => {
      if (!gardener?.id) return;
      try {
        const q = query(
          collection(db, "feedbacks"),
          where("gardenerId", "==", gardener.id)
        );
        const querySnapshot = await getDocs(q);
        const reviews = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbackList(reviews);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [gardener]);

  // Submit feedback
  const handleFeedbackSubmit = async () => {
    if (!user) {
      alert("You must be signed in to submit feedback.");
      return;
    }

    if (comment.trim() === "") {
      alert("Please write a comment");
      return;
    }

    try {
      await addDoc(collection(db, "feedbacks"), {
        gardenerId: gardener?.id || null,
        user: user.email, // ✅ use signed-in email
        userId: user.uid,
        stars: null,
        comment,
        timestamp: serverTimestamp(),
      });
      alert("Feedback submitted!");

      // Local update
      setFeedbackList((prev) => [
        ...prev,
        {
          gardenerId: gardener?.id || null,
          user: user.email,
          comment,
          timestamp: new Date(),
          id: `temp-${Date.now()}`,
        },
      ]);
      setComment("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (


    <div className={styles.body}>
      <CartSidebar />
      <Link to="/Dashboard">
        <button className={"exitButton"}>x</button>
      </Link>
      <div className={styles.border}></div>

      <div className={styles.border2}>
        <div className={styles.subtopicsmove}>
          <h2>{gardener?.fullName || "Loading gardener info..."}</h2>
          <div className={styles.ratingheading}>
            Rating:{" "}
            {gardener?.rating ? "⭐".repeat(gardener.rating) : "⭐⭐⭐⭐⭐"}
          </div>
        </div>

        <div className={styles.subtopicsmove}>
          {Array.isArray(gardener?.filters) &&
            gardener.filters.map((tag, i) => (
              <button key={i} className={styles.subheadings2}>
                {tag}
              </button>
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
              reviewSectionRef.current?.scrollIntoView({
                behavior: "smooth",
              });
            }, 100);
          }}
        >
          {showReviews ? "Hide Reviews" : "Show Reviews"}
        </button>
      </div>
      
<br />

      <div className={styles.horizontal}>
        <div className={styles.subtopicsmove}>
          {Array.isArray(gardener?.filters) &&
            gardener.filters.map((tag, i) => (
              <button key={i} className={styles.subheadings2}>
                {tag}
              </button>
            ))}
        </div>
        

        <br />


        <div className={styles.subtopicsmove}>
          <button className={styles.subheadings22}>
            Available: {gardener?.availability || "Monday - Friday"}
          </button>
          {Array.isArray(gardener?.services) &&
            gardener.services.map((service, i) => (
              <button key={i} className={styles.subheadings2}>
                {service}
              </button>
            ))}
        </div>
      </div>

      {showReviews && (
        <div ref={reviewSectionRef} className={styles.reviewDropdown}>
          <div className={styles.positionContent2}>
           
            <div className={styles.reviewText}>
              <div className={styles.reviewContent}>
                <h3>
                  {feedbackList.length} Review
                  {feedbackList.length !== 1 && "s"} -
                </h3>

                {feedbackList.length === 0 && <p>No reviews yet.</p>}


<div className={styles.moveReviewBox}>
                {feedbackList.map((review) => (
                  <div key={review.id} className={styles.reviewParagraph}>
                    <h3 className={styles.username}>Email: {review.user}</h3>
                    <br />
                    <p className={styles.moveComment}>{review.comment}</p>
                    {review.timestamp && review.timestamp.seconds && (
                      <small>
                        {new Date(
                          review.timestamp.seconds * 1000
                        ).toLocaleString()}
                      </small>
                    )}
                    {review.timestamp && !review.timestamp.seconds && (
                      <small>{new Date(review.timestamp).toLocaleString()}</small>
                    )}
                  </div>
                  
                ))}
</div>

              </div>
              
            </div>

            

<br /><br /><br /><br /><br /><br /><br /> <br /><br />
<br /><br /><br /><br /><br /><br /><br /> <br /><br />

            <div className={styles.reviewInputArea}>
              
              <h3>Leave a Review</h3>
              <textarea
                className={styles.textarea}
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your feedback..."
              />
              <button className={styles.submitbtn} onClick={handleFeedbackSubmit}>
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}

export default Gardendetails;
