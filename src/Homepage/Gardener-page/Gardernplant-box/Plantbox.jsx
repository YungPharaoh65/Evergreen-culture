import React, { useEffect, useState } from 'react';
import styles from './Gardenplant.module.css';
import { Link } from "react-router-dom";  
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebasedata/firebase';

function Gardenerbox() {
  const [gardenForms, setGardenForms] = useState([]);
  const [filteredGardenForms, setFilteredGardenForms] = useState([]); // State for filtered forms
  const [loading, setLoading] = useState(true); // Optional loading state
  const [error, setError] = useState(null);     // Optional error state
  const [activeFilter, setActiveFilter] = useState('All'); // Track active filter
  const [availableCategories, setAvailableCategories] = useState([]); // To store unique categories

  useEffect(() => {
    const fetchGardenForms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'gardenForms'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched garden forms:", data);

        setGardenForms(data);
        setFilteredGardenForms(data); // Set all forms initially

        // Extract unique categories
        const categories = Array.from(new Set(data.map(form => form.category).filter(Boolean))); // Remove duplicates and empty values
        setAvailableCategories(categories);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching garden forms:", err);
        setError("Failed to load garden forms");
        setLoading(false);
      }
    };

    fetchGardenForms();
  }, []);

  const handleFilterClick = (category) => {
    setActiveFilter(category);

    if (category === 'All') {
      setFilteredGardenForms(gardenForms); // Show all if 'All' filter is selected
    } else {
      const filtered = gardenForms.filter(form => form.category === category);
      setFilteredGardenForms(filtered); // Update filtered forms based on category
    }
  };

  return (
    <div>
      <div className={styles.plantboxWrapper}>

        
        {/* Filter divs */}
        <div className={styles.subtopicsmove}>
          <div
            className={`${styles.subheadings} ${activeFilter === 'All' ? styles.active : ''}`}
            onClick={() => handleFilterClick('All')}
          >
            All
          </div>
          {availableCategories.length > 0 ? (
            availableCategories.map((category) => (
              <div
                key={category}
                className={`${styles.subheadings} ${activeFilter === category ? styles.active : ''}`}
                onClick={() => handleFilterClick(category)}
              >
                {category}
              </div>
            ))
          ) : (
            <p>No categories available</p>
          )}
          {/* Additional Filter Options */}
          <div
            className={`${styles.subheadings} ${activeFilter === 'Pest Controlled' ? styles.active : ''}`}
            onClick={() => handleFilterClick('Pest Controlled')}
          >
            Pest Controlled
          </div>
          <div
            className={`${styles.subheadings} ${activeFilter === 'Other' ? styles.active : ''}`}
            onClick={() => handleFilterClick('Other')}
          >
            Other
          </div>
        </div>

        {/* Loading / Error States */}
        {loading && <p>Loading garden forms...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <br />

         
        {/* Display Garden Form Cards */}
        <div className={styles.centerbar2}>
          {filteredGardenForms.length === 0 && !loading && !error && (
            <p>No garden forms found for this category.</p>
          )}
          {filteredGardenForms.map((gardenForm) => (
            <Link to={`/Plantdetails/${gardenForm.id}`} key={gardenForm.id}>
              <div className={styles.dashboardContainer2}>
                {/* Optional Image */}
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: gardenForm.imageURL
                      ? `url(${gardenForm.imageURL})`
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>

                {/* Subtopic divs for filter */}
                <div className={styles.subtopicsmove}>
                  <div className={styles.order}>Order</div>
                  <div className={styles.subtopics}>
                    {gardenForm.category || 'Uncategorized'}
                  </div>
                </div>

                {/* Name and Description */}
                <div className={styles.header}>{gardenForm.name || 'No Name'}</div>
                <a href="#">Did you know</a>
                <div className={styles.price}></div>
              </div>
            </Link>
            
            
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gardenerbox;
