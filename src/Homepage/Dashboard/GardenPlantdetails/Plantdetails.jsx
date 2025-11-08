import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Gardenplantdetails.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebasedata/firebase";

function Plantdetails() {
  const { id } = useParams();
  const [plantData, setPlantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const plantEmojis = ["🌱", "🍃", "🌿", "🌾", "🌻", "🍂", "🌺", "🌼"];
  const getRandomEmoji = () => plantEmojis[Math.floor(Math.random() * plantEmojis.length)];

  // Fetch plant data from Firestore
  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const docRef = doc(db, "gardenForms", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("No plant found");
          setLoading(false);
          return;
        }

        const data = docSnap.data();
        // Convert howToPlant string to array if needed
        if (data.howToPlant && typeof data.howToPlant === "string") {
          data.howToPlant = data.howToPlant.split("\n").filter(line => line.trim() !== "");
        }

        setPlantData(data);
      } catch (err) {
        console.error("Error fetching plant:", err);
        setError("Failed to load plant data");
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!plantData) return null;

  return (
    <div className={styles.body}>
      <Link to="/Dashboard">
        <button className="exitButton">x</button>
      </Link>

      {/* Plant Image */}
      <div
        className={styles.image}
        style={{
          backgroundImage: plantData.imageURL ? `url(${plantData.imageURL})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "20rem",
          height: "20rem",
          borderRadius: "1rem",
          marginTop: "5rem",
          border: plantData.imageURL ? "none" : "1px solid #ccc",
        }}
      >
        {!plantData.imageURL && <p style={{ padding: "1rem" }}>Image not available</p>}
      </div>

      {/* Plant Details */}
      <div className={styles.border2}>
        <h2>{plantData.name || "No Name"}</h2>
        <button className={styles.subheadings2}>
          {getRandomEmoji()} Category:{" "}
          {Array.isArray(plantData.category) ? plantData.category.join(", ") : plantData.category || "Unknown"}
        </button>

        <h3>About {plantData.name}</h3>

        <p className={styles.paragraph}>{plantData.about || "No description available"}</p>
<br /><br /><br /><br />
        {/* Subtopics */}
        <div className={styles.subtopicsmove}>
          <button className={styles.subheadings2}>🌞 {plantData.weather || "Summer"}</button>
          <button className={styles.subheadings2}>
            {Array.isArray(plantData.kind) ? plantData.kind.join(", ") : plantData.kind || "Invasive / Friendly"}
          </button>
          <button className={styles.subheadings2}>{plantData.location || "Indoor / Outdoor"}</button>
        </div>

        
      </div>

      {/* How to Plant Section */}
        <h2>Take care of {plantData.name}</h2>
        <div className={styles.centerboxes}>
          <div className={styles.box1}>
            <h3>Water</h3>
            <p>{plantData.water || "once every 2 days"}</p>
          </div>
          <div className={styles.box1}>
            <h3>Placement</h3>
            <p>{plantData.placement || "less than 6ft from window"}</p>
          </div>
          <div className={styles.box1}>
            <h3>Nutrients</h3>
            <p>{plantData.nutrients || "Repot after 2x growth"}</p>
          </div>
        </div>

        <div className={styles.centerboxes}>
          <div className={styles.box2}>
            <h2>How to Plant: {plantData.name}</h2>
            {plantData.howToPlant && plantData.howToPlant.length > 0 ? (
              <ol>
                {plantData.howToPlant.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            ) : (
              <p>Instructions not available.</p>
            )}

            <h3>Did you know:</h3>
            <p>{plantData.fact || "This plant improves indoor air quality!"}</p>
          </div>
        </div>

    </div>
  );
}

export default Plantdetails;
