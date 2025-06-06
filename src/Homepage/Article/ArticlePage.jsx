import React from "react";
import { Link } from "react-router-dom";
import styles from "./ArticlePage.module.css";

function ArticlePage() {
  return (
    <div className={styles.pageWrapper}>
      {/* Close Button */}
      <div className={styles.exitButton}>
        <Link to="/factsAndInfo" className={styles.closeLink}>
          ✕
        </Link>
      </div>

      {/* Article Content */}
      <div className={styles.pageContainer}>
        <div className={styles.articleContainer}>
          <img
            src="/images/anthurium.jpg"
            alt="Bright red Anthurium plant"
            className={styles.articleImage}
          />

          <h1 className={styles.title}>The Allure of Anthurium</h1>
          <h2 className={styles.subtitle}>A Complete Beginner’s Guide to the Flamingo Flower 🌺</h2>

          <p className={styles.content}>
            If you're just starting your plant journey, meet the Anthurium – often called the Flamingo Flower or Laceleaf.
            This tropical beauty is known for its shiny green leaves and striking red or pink “flowers” (which are actually colorful spathes).
          </p>

          <h3 className={styles.sectionHeader}>🌿 Why Choose Anthurium?</h3>
          <p className={styles.content}>
            - **Low maintenance** once settled<br />
            - **Blooms all year round** with proper care<br />
            - Adds a **splash of color and elegance** to indoor spaces<br />
            - Great for **apartments, offices, or tabletops**
          </p>

          <h3 className={styles.sectionHeader}>☀️ Light Requirements</h3>
          <p className={styles.content}>
            Anthuriums love **bright, indirect sunlight**. That means placing it near a window, but not directly under harsh sunlight. Direct sun can burn its leaves.
            If the leaves start turning yellow, it’s probably getting too much light.
          </p>

          <h3 className={styles.sectionHeader}>💧 Watering</h3>
          <p className={styles.content}>
            Water about once a week, or when the top inch of soil feels dry. Avoid overwatering—it’s better to be slightly dry than soaked.
            Make sure your pot has **drainage holes**. If not, water can collect and cause root rot.
          </p>

          <h3 className={styles.sectionHeader}>🌡️ Humidity & Temperature</h3>
          <p className={styles.content}>
            Anthuriums are tropical, so they thrive in **warm, humid environments**. Keep them in a room that’s between 18–26°C (65–80°F).
            If your home is dry, mist the leaves occasionally or place a bowl of water nearby to raise humidity.
          </p>

          <h3 className={styles.sectionHeader}>🪴 Soil & Repotting</h3>
          <p className={styles.content}>
            Use a **well-draining potting mix**—a mix of orchid bark, peat moss, and perlite is ideal. Repot your Anthurium every 1–2 years in spring
            to give it room to grow and refresh the soil.
          </p>

          <h3 className={styles.sectionHeader}>❌ Common Mistakes to Avoid</h3>
          <p className={styles.content}>
            - Overwatering or letting water sit at the bottom of the pot<br />
            - Direct sunlight on leaves<br />
            - Using regular garden soil (it holds too much moisture)<br />
            - Neglecting to clean dust off the leaves (blocks sunlight)
          </p>

          <h3 className={styles.sectionHeader}>🌺 Final Thoughts</h3>
          <p className={styles.content}>
            Anthuriums are perfect for beginners looking for a bold, easy-care plant that looks like it came straight from the rainforest.
            With a little love and light, you’ll have a showstopper plant that thrives and blooms for years.
          </p>

          <button className={styles.readMoreBtn}>🌿 See Other Easy-Care Plants</button>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
