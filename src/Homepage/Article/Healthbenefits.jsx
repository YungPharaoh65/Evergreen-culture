import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Healthbenefits.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";

function Healthbenefits() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HEADER SECTION */}
      <div className={styles.secondSection}>
        <Link to="/Morearticles">
          <button>x</button>
        </Link>

        <h1 className={styles.newHybrid}>Health Benefits: Why Gardening Will Suit You 🌱</h1>

        <p className={styles.centerText}>
          Gardening is not only enjoyable — it’s also incredibly beneficial for your physical and mental health.
          Learn why spending time in your garden can improve your wellbeing.
        </p>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <div className={styles.centerimgbox2}>
        <div className={styles.imgbox3}>
          <div className={styles.imgbox3Text}>
            <h3>🌿 Physical Health Benefits</h3>
            <p>
              Gardening is a natural form of exercise. Digging, planting, and weeding strengthen muscles, improve flexibility, 
              and burn calories without the need for a gym.
            </p>
            <p>
              Regular gardening can also reduce the risk of heart disease and support a healthy lifestyle.
            </p>
          </div>
        </div>
      </div>

      {/* MENTAL WELLNESS */}
      <div className={styles.centerimgbox2}>
        <div className={styles.imgbox3}>
          <div className={styles.imgbox3Text}>
            <h3>🌼 Mental Health Benefits</h3>
            <p>
              Spending time in the garden reduces stress, anxiety, and depression. The act of nurturing plants helps 
              improve mood and fosters mindfulness, giving you a sense of achievement.
            </p>
            <p>
              Gardening has been linked to increased dopamine levels, which helps you feel happy and fulfilled.
            </p>
          </div>
        </div>
      </div>

      {/* IMMUNITY AND WELLNESS */}
      <div className={styles.centerimgbox2}>
        <div className={styles.imgbox3}>
          <div className={styles.imgbox3Text}>
            <h3>🌞 Boost Your Immunity</h3>
            <p>
              Exposure to sunlight while gardening provides Vitamin D, which is essential for a strong immune system. 
              Contact with soil microbes can also positively influence your gut and immune health.
            </p>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className={styles.secondSection2}>
        <div className={styles.logoheader}>
          read more about health tips below{" "}
          <FontAwesomeIcon icon={faHeartbeat} color="#2c7446" className={styles.FontAwesomeIcon} />
        </div>
      </div>


      {/* NAVIGATION + SOCIALS */}
      <div className={styles.secondSection2}>
        <p className={styles.text}>
          ( click the word{" "}
          <b
            onClick={() => navigate("/Morearticles")}
            style={{ color: "#2c7446ff", cursor: "pointer" }}
          >
            articles
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

export default Healthbenefits;
