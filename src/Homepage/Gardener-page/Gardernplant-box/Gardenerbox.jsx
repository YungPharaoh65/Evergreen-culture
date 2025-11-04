import React, { useEffect, useState } from 'react';
import styles from './Gardenplant.module.css';
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebasedata/firebase';

function Gardenerbox() {
  const [gardeners, setGardeners] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filterOptions = ["All", "Landscaping", "Formal Garden", "Other"];

  useEffect(() => {
    const fetchGardeners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gardeners"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGardeners(data);
      } catch (error) {
        console.error("Error fetching gardeners:", error);
      }
    };
    fetchGardeners();
  }, []);

  const filteredGardeners =
    selectedFilter === "All"
      ? gardeners
      : gardeners.filter(
          (g) =>
            g.filters?.includes(selectedFilter) ||
            (selectedFilter === "Other" &&
              !g.filters?.some((f) =>
                ["Landscaping", "Formal Garden"].includes(f)
              ))
        );

  return (
    <div className={styles.plantboxWrapper}>
      <div className={styles.subtopicsmove}>
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`${styles.subheadings} ${
              selectedFilter === filter ? styles.activeFilter : ""
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className={styles.centerbar2}>
        {filteredGardeners.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            No gardeners match the filter.
          </p>
        ) : (
          filteredGardeners.map((g) => {
            const imageUrl =
              g.profileImageURL || "https://via.placeholder.com/150";

            return (
              <Link to={`/Gardendetails/${g.id}`} key={g.id}>
                <div className={styles.dashboardContainer1}>
                  <div
                    className={styles.image}
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "150px",
                      height: "150px",
                      borderRadius: "8px",
                    }}
                  ></div>

                  <div className={styles.subtopicsmove}>
                    {g.filters?.map((f, idx) => (
                      <button key={idx} className={styles.subtopics}>
                        {f}
                      </button>
                    ))}
                  </div>

                  <div className={styles.header}>
                    {g.fullName || "Unnamed Gardener"}
                  </div>
                  <a href="#">more info</a>
                  <div className={styles.location}>
                    {g.preferredLocation || "Location not set"}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Gardenerbox;
