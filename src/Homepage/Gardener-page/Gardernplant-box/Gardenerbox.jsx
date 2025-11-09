import React, { useEffect, useState } from "react";
import styles from "./Gardenplant.module.css";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../Firebasedata/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Gardenerbox() {
  const [gardenForms, setGardenForms] = useState([]);
  const [filteredGardenForms, setFilteredGardenForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [availableCategories, setAvailableCategories] = useState([]);

  // ✅ Fetch garden data from Firestore
  useEffect(() => {
    const fetchGardenForms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gardenForms"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setGardenForms(data);
        setFilteredGardenForms(data);

        const allCategories = data
          .map((form) => form.category)
          .flatMap((cat) => (Array.isArray(cat) ? cat : [cat]))
          .filter(Boolean);

        setAvailableCategories([...new Set(allCategories)]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching garden forms:", err);
        setError("Failed to load garden forms");
        setLoading(false);
      }
    };

    fetchGardenForms();
  }, []);

  // ✅ Handle filtering by category
  const handleFilterClick = (category) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredGardenForms(gardenForms);
    } else {
      const filtered = gardenForms.filter((form) => {
        const formCats = Array.isArray(form.category)
          ? form.category
          : [form.category];
        return formCats.includes(category);
      });
      setFilteredGardenForms(filtered);
    }
  };

  return (
    <div className={styles.plantboxWrapper}>
      {/* ✅ Category Filter Section */}
      <div className={styles.subtopicsmove}>
        <div
          className={`${styles.subheadings} ${
            activeFilter === "All" ? styles.active : ""
          }`}
          onClick={() => handleFilterClick("All")}
        >
          All
        </div>

        {availableCategories.map((category) => (
          <div
            key={`category-${category}`}
            className={`${styles.subheadings} ${
              activeFilter === category ? styles.active : ""
            }`}
            onClick={() => handleFilterClick(category)}
          >
            {category}
          </div>
        ))}
      </div>

      {/* ✅ Garden Cards Section */}
      {loading && <p>Loading garden forms...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.centerbar2}>
        {filteredGardenForms.length === 0 && !loading && (
          <p>No plants found for this category 🌸</p>
        )}

        {filteredGardenForms.map((gardenForm) => (
          <Link to={`/Plantdetails/${gardenForm.id}`} key={gardenForm.id}>
            <div className={styles.dashboardContainer2}>
              {/* ✅ Display uploaded plant image */}
              {gardenForm.imageURL ? (
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: `url(${gardenForm.imageURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              ) : (
                <div className={styles.imagePlaceholder}>No Image</div>
              )}

              {/* ✅ Category + Heart Icon */}
              <div className={styles.subtopicsmove}>
                <div className={styles.order}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    color="#f9fffb"
                    className={styles.FontAwesomeIcon}
                  />
                </div>
                <div className={styles.subtopics}>
                  {Array.isArray(gardenForm.category)
                    ? gardenForm.category.join(", ")
                    : gardenForm.category}
                </div>
              </div>

              {/* ✅ Plant Name */}
              <div className={styles.header}>{gardenForm.name}</div>
              <a href="#">Did you know?</a>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Gardenerbox;
