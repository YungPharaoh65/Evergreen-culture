import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Gardenplantdetails.module.css";
import CartSidebar from "../../Gardener-page/Gardernplant-box/Cartpage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebasedata/firebase";

function Plantdetails() {
  const { id } = useParams(); // Extract ID from route
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHowToPlant, setShowHowToPlant] = useState(false);

  const howToPlantRef = useRef(null); // For smooth scrolling

  // Array of plant-related emojis
  const plantEmojis = ["🌱", "🍃", "🌿", "🌾", "🌻", "🍂", "🌺", "🌼"];

  // Function to get a random plant emoji
  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * plantEmojis.length);
    return plantEmojis[randomIndex];
  };

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const docRef = doc(db, "gardenForms", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPlantData(docSnap.data());
        } else {
          setError("No plant found");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching plant:", err);
        setError("Failed to load plant data");
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.body}>
      <CartSidebar />

      {/* Exit Button */}
      <Link to="/Dashboard">
        <button className="exitButton">x</button>
      </Link>

      <div className={styles.border}></div>

      <div className={styles.border2}>
        <div className={styles.subtopicsmove}>
          <h2>{plantData.name || "No Name"}</h2>
           </div>

        <div className={styles.subtopicsmove}>
          {/* Category button with random plant emoji */}
          <button className={styles.subheadings2}>
            {getRandomEmoji()} Category: {plantData.category || "Unknown Category"}
          </button>
             </div>

             <h3>About {plantData.name}</h3>
 

{plantData.about && (
  <div>
      <p className={styles.paragraph}>{plantData.about}</p>
  </div>
)}

<br />

        <button className={styles.cartbutton}>add to cart</button>

        {/* Toggle Dropdown */}
        <button
          className={styles.reviewDropdown}
          onClick={() => setShowHowToPlant((prev) => !prev)}
        >
          how to plant
        </button>
      </div>

      <br />
      <br />
      <div className={styles.subtopicsmove}>
        <button className={styles.subheadings2}>🌞 {plantData.season || "Summer"} :Weather</button>
        <button className={styles.subheadings2}>{plantData.type || "Invasive / Friendly"}</button>
        <button className={styles.subheadings2}>{plantData.location || "Indoor Gardens"}</button>
      </div>

      {/* Dropdown Section */}
      <div
        className={`${styles.dropdownWrapper} ${showHowToPlant ? styles.open : styles.closed}`}
        ref={howToPlantRef}
      >
        <div className={styles.positionContent}>
          <h2>take care of {plantData.name}</h2>
          <br />
          <div className={styles.centerboxes}>
            <div className={styles.box1}>
              <h2>Water</h2>
              <p className={styles.text}>{plantData.water || "once every 2 days"}</p>
            </div>
            <div className={styles.box1}>
              <h2>Placement</h2>
              <p className={styles.text}>{plantData.placement || "less than 6ft from window"}</p>
            </div>
            <div className={styles.box1}>
              <h2>Nutrients</h2>
              <p className={styles.text}>{plantData.nutrients || "Repot after 2x growth"}</p>
            </div>
          </div>

          <div className={styles.centerboxes}>
            <button
              className={styles.reviewDropdown}
              onClick={() => {
                setShowHowToPlant(false);
                setTimeout(() => {
                  howToPlantRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              Close section
            </button>
          </div>

          <div className={styles.centerboxes}>
            <div className={styles.box2}>
              <h2>How to plant: <br /> {plantData.name}</h2>
              <br />
              {plantData.plantingInstructions ? (
                plantData.plantingInstructions.split('\n').map((step, index) => (
                  <p className={styles.text} key={index}>
                    {index + 1}.) {step}
                  </p>
                ))
              ) : plantData.howToPlant ? (
                plantData.howToPlant.split('\n').map((step, index) => (
                  <p className={styles.text} key={index}>
                    {index + 1}.) {step}
                  </p>
                ))
              ) : null}

              <br /><br /><br /><br /><br />
              <h3>Did you know: </h3>
              <p className={styles.text}>
                {plantData.fact || "This plant improves indoor air quality!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plantdetails;
