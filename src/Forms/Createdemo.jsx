import React, { useState } from "react";
import styles from "./Createdemo.module.css";

const Createdemo = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "🪴 How do I take care of indoor plants?",
      answer:
        "Indoor plants need consistent but moderate watering — usually once a week. Place them near indirect sunlight, and avoid overwatering as it can cause root rot. Clean leaves occasionally to help them breathe and photosynthesize better.",
    },
    {
      question: "🌿 What’s the best way to care for outdoor plants?",
      answer:
        "Outdoor plants thrive in natural sunlight but may need protection during extreme weather. Water them early in the morning, use nutrient-rich soil, and remove weeds regularly. Adding compost or mulch helps retain moisture and improve growth.",
    },
    {
      question: "🌵 How do I care for succulents and cacti?",
      answer:
        "Succulents and cacti need plenty of light and very little water. Use sandy, well-draining soil and water only when the soil is completely dry. Too much water is the most common cause of succulent problems.",
    },
    {
      question: "🌸 How should I care for flowering plants?",
      answer:
        "Flowering plants need sunlight, regular pruning, and nutrient-rich soil. Deadhead (remove) old flowers to encourage new blooms. Fertilize during the growing season and protect them from pests by keeping leaves clean and dry.",
    },
    {
      question: "🌱 What’s the best way to grow herbs at home?",
      answer:
        "Herbs like basil, mint, and parsley need at least 4–6 hours of sunlight daily. Keep the soil slightly moist, harvest regularly to encourage new growth, and avoid letting them dry out completely.",
    },
    {
      question: "🌳 How do I take care of young trees?",
      answer:
        "Young trees need deep watering once or twice a week and mulching around the base to retain soil moisture. Prune damaged branches and protect the trunk from pests or lawn damage as they grow.",
    },
    {
      question: "💧 How can I tell if I’m overwatering or underwatering my plants?",
      answer:
        "Overwatered plants often have yellow leaves and soft stems, while underwatered plants look dry and wilted. Always check soil moisture before watering — the top 2–3 cm should be dry before adding more water.",
    },
    {
      question: "🌤 What’s the best light for healthy plant growth?",
      answer:
        "Most plants prefer bright, indirect sunlight. Low-light plants (like ferns or pothos) do well in shaded areas, while high-light plants (like succulents) need direct sun for several hours daily.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <h2>🌿 Plant Care & Education FAQs</h2>
      <p className={styles.faqIntro}>
        Learn how to care for different types of plants — from houseplants to herbs — and discover
        the joy of sustainable gardening.
      </p>

      <div className={styles.faqGrid}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${styles.faqCard} ${
              activeIndex === index ? styles.active : ""
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <h3 className={styles.faqQuestion}>{faq.question}</h3>
            {activeIndex === index && (
              <p className={styles.faqAnswer}>{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Createdemo;
