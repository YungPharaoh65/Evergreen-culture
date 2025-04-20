import React, { useEffect, useState } from 'react';
import styles from './Gardenplant.module.css';
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebasedata/firebase';

function Gardenerbox() {
  const [gardeners, setGardeners] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterOptions = ["All", "Landscaping", "Cultivating", "Other"];

  useEffect(() => {
    const fetchGardeners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gardeners"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setGardeners(data);
      } catch (error) {
        console.error("Error fetching gardeners: ", error);
      }
    };

    fetchGardeners();
  }, []);

  const filteredGardeners = selectedFilter === 'All'
    ? gardeners
    : gardeners.filter(gardener =>
        gardener.filters?.includes(selectedFilter) || (selectedFilter === "Other" && !gardener.filters?.some(filter => ["Landscaping", "Cultivating"].includes(filter)))
      );

  return (
    <div className={styles.plantboxWrapper}>

      {/* FILTER BUTTONS */}
      <div className={styles.subtopicsmove}>
        {filterOptions.map((filter) => (
          <button
            key={filter}
            className={`${styles.subheadings} ${selectedFilter === filter ? styles.activeFilter : ''}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
        <br /><br />
      </div>

      {/* GARDENER PROFILES */}
      <div className={styles.centerbar2}>
        {filteredGardeners.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>No gardeners match the filter.</p>
        ) : (
          filteredGardeners.map((gardener) => {
            // Get the image URL from localStorage
            const gardenerImage = localStorage.getItem(gardener.id);
            console.log(gardener.id, gardenerImage); // Check what image is fetched

            // Default to placeholder image if no image is found in localStorage
            const imageUrl = gardenerImage ? gardenerImage : "https://via.placeholder.com/150";

            return (
              <Link to={`/Gardendetails/${gardener.id}`} key={gardener.id}>
                <div className={styles.dashboardContainer1}>

                  {/* IMAGE PLACEHOLDER */}
                  <div
                    className={styles.image}
                    style={{
                      backgroundImage: `url(${imageUrl})`, // Set the image from localStorage or placeholder
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>

                  {/* FILTER TAGS */}
                  <div className={styles.subtopicsmove}>
                    {gardener.filters?.map((filter, idx) => (
                      <button key={idx} className={styles.subtopics}>
                        {filter}
                      </button>
                    ))}
                  </div>

                  {/* GARDENER NAME */}
                  <div className={styles.header}>
                    {gardener.fullName || "Unnamed Gardener"}
                  </div>

                  {/* MORE INFO */}
                  <a href="#">more info</a>

                  {/* LOCATION */}
                  <div className={styles.location}>
                    {gardener.preferredLocation || "Location not set"}
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
