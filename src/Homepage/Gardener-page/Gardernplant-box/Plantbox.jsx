import React, { useEffect, useState } from 'react';
import styles from './Gardenplant.module.css';
import { Link } from "react-router-dom";  
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebasedata/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSeedling } from "@fortawesome/free-solid-svg-icons";


function Gardenerbox() {
  const [gardenForms, setGardenForms] = useState([]);
  const [filteredGardenForms, setFilteredGardenForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [availableCategories, setAvailableCategories] = useState([]);

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
        setFilteredGardenForms(data);

        // Flatten all categories and remove duplicates
        const allCategories = data
          .map(form => form.category) // may be string or array
          .flatMap(cat => Array.isArray(cat) ? cat : [cat])
          .filter(Boolean);

        const uniqueCategories = Array.from(new Set(allCategories));
        setAvailableCategories(uniqueCategories);

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
      setFilteredGardenForms(gardenForms);
    } else if (category === 'Other') {
      // Anything that does not match known categories
      const filtered = gardenForms.filter(form => {
        const formCats = Array.isArray(form.category) ? form.category : [form.category];
        return formCats.every(c => !availableCategories.includes(c));
      });
      setFilteredGardenForms(filtered);
    } else {
      const filtered = gardenForms.filter(form => {
        const formCats = Array.isArray(form.category) ? form.category : [form.category];
        return formCats.includes(category);
      });
      setFilteredGardenForms(filtered);
    }
  };

  return (
    <div className={styles.plantboxWrapper}>
      
      {/* Filter Section */}
      <div className={styles.subtopicsmove}>
        <div
          key="filter-all"
          className={`${styles.subheadings} ${activeFilter === 'All' ? styles.active : ''}`}
          onClick={() => handleFilterClick('All')}
        >
          All
        </div>

        {availableCategories.map((category) => (
          <div
            key={`category-${category}`} 
            className={`${styles.subheadings} ${activeFilter === category ? styles.active : ''}`}
            onClick={() => handleFilterClick(category)}
          >
            {category}
          </div>
        ))}

        {/* "Other" button */}
        <div
          key="category-other"
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
              
              {/* Image */}
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

              <br />

              {/* Category & Icon */}
              <div className={styles.subtopicsmove}>
                <div className={styles.order}>
                  <FontAwesomeIcon icon={faHeart} color="#f9fffb" className={styles.FontAwesomeIcon} />
                </div>
                <div className={styles.subtopics}>
                  {Array.isArray(gardenForm.category) ? gardenForm.category.join(", ") : gardenForm.category || 'Uncategorized'}
                </div>
              </div>

              {/* Name & Info */}
              <div className={styles.header}>{gardenForm.name || 'No Name'}</div>
              <a href="#">Did you know</a>
              <div className={styles.price}></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Gardenerbox;

