import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Benefitsofgardening.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

function Benefitsofgardening() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HEADER SECTION */}
      <div className={styles.secondSection}>
        <Link to="/Morearticles">
          <button>x</button>
        </Link>

        <h1 className={styles.newHybrid}>The Benefits of Gardening 🌱</h1>

        <p className={styles.centerText}>
          Gardening is more than just planting seeds — it's a journey toward 
          mindfulness, health, and environmental harmony. Discover how tending to 
          your garden can transform your life.
        </p>
      </div>

      {/* MAIN CONTENT SECTION */}
      <div className={styles.centerimgbox2}>
        <div className={styles.imgbox3}>
          <div className={styles.imgbox3Text}>
            <h3>🌿 Physical Health Benefits</h3>
            <p>
              Gardening helps improve your fitness without the need for a gym. 
              Activities like digging, watering, and weeding build muscle strength, 
              flexibility, and stamina — all while being outdoors.
            </p>
            <p>
              Studies show that spending just 30 minutes gardening can burn over 
              150 calories and help regulate blood pressure naturally.
            </p>
          </div>
        </div>
      </div>

      {/* MENTAL WELLNESS SECTION */}
      <div className={styles.centerimgbox2}>
        <div className={styles.imgbox3}>
          <div className={styles.imgbox3Text}>
            <h3>🌼 Mental & Emotional Wellness</h3>
            <p>
              Gardening acts as a natural stress reliever. The act of nurturing plants 
              promotes calmness and mindfulness. It reduces anxiety, boosts dopamine 
              levels, and increases feelings of fulfillment.
            </p>
            <p>
              Even a small balcony garden can help reconnect you with nature — offering 
              a peaceful escape from screens and daily stress.
            </p>
          </div>
        </div>
      </div>

      {/* ENVIRONMENTAL IMPACT SECTION */}
      <div className={styles.centerimgbox2}>
        <div className={styles.imgbox3}>
          <div className={styles.imgbox3Text}>
            <h3>🌻 Environmental Impact</h3>
            <p>
              Every plant you grow contributes to a healthier planet. Gardens reduce 
              carbon dioxide, improve air quality, and support biodiversity by attracting 
              pollinators like bees and butterflies.
            </p>
            <p>
              Composting organic waste and planting native species can make your garden 
              an eco-friendly sanctuary.
            </p>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className={styles.secondSection2}>
        <div className={styles.logoheader}>
          What’s your favorite thing about gardening? Share your thoughts below{" "}
          <FontAwesomeIcon icon={faLeaf} color="#2c7446" className={styles.FontAwesomeIcon} />
        </div>
      </div>

      <div className={styles.secondSection2}>
        <textarea
          placeholder="Type your message here..."
          rows="5"
          style={{
            width: "25rem",
            textAlign: "center",
            borderRadius: "8px",
            resize: "none",
          }}
        ></textarea>
      </div>

      <div className={styles.secondSection2}>
        <button style={{ marginBottom: "2rem", textAlign: "center" }}>Submit</button>
      </div>

      {/* NAVIGATION + SOCIALS */}
      <div className={styles.secondSection2}>
        <p className={styles.text}>
          ( click the word{" "}
          <b
            onClick={() => navigate("/Choosepath")}
            style={{ color: "#2c7446ff", cursor: "pointer" }}
          >
            dashboard
          </b>{" "}
          to see your options )
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

export default Benefitsofgardening;
