import React, { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import styles from "./SearchArticle.module.css";
import { db } from "./../../Firebasedata/firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function SearchArticle() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    if (!feedback.trim()) return; // skip empty submissions
    try {
      await addDoc(collection(db, "feedbacks"), {
        message: feedback,
        createdAt: serverTimestamp(),
      });
      setStatus("✅ Feedback submitted successfully!");
      setFeedback(""); // clear textarea
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setStatus("❌ Failed to submit feedback. Try again.");
    }
  };

  return (
    <div>
      {/* Top Sections */}
      <div className={styles.secondSection}>
        <h1 className={styles.newHybrid}>Most Popular Right Now...</h1>
        <div className={styles.centerimgbox2}>
          <Link to="/WhatMakesAFlowerBloom">
            <button>What makes a flower bloom</button> 
          </Link>
          <Link to="/Articles">
            <button>DIY: How to make your own garden</button> 
          </Link>
          <Link to="/Benefitsofgardening">
            <button>Benefits of gardening</button> 
          </Link>
          <Link to="/Healthbenefits">
            <button>Health Benefits: why gardening will suit you</button> 
          </Link>
        </div>
      </div>

      {/* Recent Articles Section */}
      <h1>Recent Articles</h1>
      <div className={styles.centerimgbox2}>
        {[1, 2, 3].map((item) => (
          <div key={item} className={styles.centerimgbox2}>
            <div className={styles.imgbox3}>
              <div className={styles.imgbox3Text}>
                <h3>Planting trees and <br /> its benefits</h3>
                <p>
                  Learn about how we show information <br />
                  and how they benefit us on the <br />
                  <b><u>article</u></b> site
                </p>
                <p>LEARN MORE 🌳</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Section */}
      <div className={styles.secondSection2}>
        <div className={styles.logoheader}>
          Have a suggestion? Please add yours below{" "}
          <FontAwesomeIcon icon={faSeedling} color="#25D366" className={styles.FontAwesomeIcon} />
        </div>
      </div>

      <div className={styles.secondSection2}>
        <textarea
          placeholder="Type your message here..."
          rows="5"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          style={{
            width: "25rem",
            textAlign: "center",
            borderRadius: "8px",
            resize: "none",
          }}
        />
      </div>

      <div className={styles.secondSection2}>
        <button
          style={{ marginBottom: "2rem", textAlign: "center" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      {status && (
        <p style={{ textAlign: "center", color: "green", marginBottom: "1rem" }}>
          {status}
        </p>
      )}

<br />br

      <div className={styles.secondSection2}>
        <p className={styles.text}>
          (click the word{" "}
          <b
            onClick={() => navigate("/Choosepath")}
            style={{ color: "#2c7446ff", cursor: "pointer" }}
          >
            dashboard
          </b>{" "}
          to see your options)
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
