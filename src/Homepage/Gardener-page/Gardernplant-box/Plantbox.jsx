import React, { useEffect, useState } from 'react';
import styles from './Gardenplant.module.css';
import { Link } from "react-router-dom";  
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebasedata/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Gardenerbox() {
  const [gardenForms, setGardenForms] = useState([]);
  const [filteredGardenForms, setFilteredGardenForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Controlled filter & selected id persisted to localStorage
  const [activeFilter, setActiveFilter] = useState(
    () => localStorage.getItem('garden_activeFilter') || 'All'
  );
  const [selectedId, setSelectedId] = useState(
    () => localStorage.getItem('garden_selectedId') || null
  );
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    // persist activeFilter and selectedId in localStorage whenever they change
    localStorage.setItem('garden_activeFilter', activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (selectedId) localStorage.setItem('garden_selectedId', selectedId);
    else localStorage.removeItem('garden_selectedId');
  }, [selectedId]);

  useEffect(() => {
    let cancelled = false;
    const fetchGardenForms = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'gardenForms'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (cancelled) return;

        setGardenForms(data);

        // Extract unique categories (string)
        const categories = Array.from(new Set(
          data.map(form => form.category).filter(Boolean)
        ));
        setAvailableCategories(categories);

        // If activeFilter is not present in categories and not 'All', keep it (so selection persists)
        // But when applying filter for display, only show existing items
        if (activeFilter === 'All') {
          setFilteredGardenForms(data);
        } else {
          setFilteredGardenForms(data.filter(f => f.category === activeFilter));
        }

        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        console.error("Error fetching garden forms:", err);
        setError("Failed to load garden forms");
        setLoading(false);
      }
    };

    fetchGardenForms();
    return () => { cancelled = true; };
    // Intentionally do NOT depend on activeFilter here to avoid refetch loops.
    // We want to fetch once and then filter client-side.
  }, []); // only on mount

  // Apply filter client-side when activeFilter or gardenForms change
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredGardenForms(gardenForms);
    } else {
      setFilteredGardenForms(gardenForms.filter(form => form.category === activeFilter));
    }
  }, [activeFilter, gardenForms]);

  const handleFilterClick = (category) => {
    setActiveFilter(category);
  };

  const handleCardSelect = (id) => {
    setSelectedId(id);
    // Note: navigation will occur (Link) after clicking — selection will persist in localStorage
  };

  return (
    <div className={styles.plantboxWrapper}>
      {/* Filter Section */}
      <div className={styles.subtopicsmove}>
        <div
          role="button"
          tabIndex={0}
          className={`${styles.subheadings} ${activeFilter === 'All' ? styles.active : ''}`}
          onClick={() => handleFilterClick('All')}
          onKeyDown={(e) => { if (e.key === 'Enter') handleFilterClick('All'); }}
        >
          All
        </div>

        {availableCategories.length > 0 ? (
          availableCategories.map((category) => (
            <div
              key={category}
              role="button"
              tabIndex={0}
              className={`${styles.subheadings} ${activeFilter === category ? styles.active : ''}`}
              onClick={() => handleFilterClick(category)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleFilterClick(category); }}
            >
              {category}
            </div>
          ))
        ) : (
          <div className={styles.noCategories}>No categories available</div>
        )}

        {/* Extra Filter Options only if they are not already included */}
        {!availableCategories.includes('Pest Controlled') && (
          <div
            role="button"
            tabIndex={0}
            className={`${styles.subheadings} ${activeFilter === 'Pest Controlled' ? styles.active : ''}`}
            onClick={() => handleFilterClick('Pest Controlled')}
            onKeyDown={(e) => { if (e.key === 'Enter') handleFilterClick('Pest Controlled'); }}
          >
            Pest Controlled
          </div>
        )}
        {!availableCategories.includes('Other') && (
          <div
            role="button"
            tabIndex={0}
            className={`${styles.subheadings} ${activeFilter === 'Other' ? styles.active : ''}`}
            onClick={() => handleFilterClick('Other')}
            onKeyDown={(e) => { if (e.key === 'Enter') handleFilterClick('Other'); }}
          >
            Other
          </div>
        )}
      </div>

      {/* Loading / Error */}
      {loading && <p>Loading garden forms...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <br />

      {/* Cards */}
      <div className={styles.centerbar2}>
        {filteredGardenForms.length === 0 && !loading && !error && (
          <p>No garden forms found for this category.</p>
        )}

        {filteredGardenForms.map((gardenForm) => {
          const isSelected = selectedId === gardenForm.id;
          return (
            <Link
              to={`/Plantdetails/${gardenForm.id}`}
              key={gardenForm.id}
              onClick={() => handleCardSelect(gardenForm.id)}
              className={`${styles.cardLink} ${isSelected ? styles.selectedCardLink : ''}`}
            >
              <div className={`${styles.dashboardContainer2} ${isSelected ? styles.selected : ''}`}>
                <div
                  className={styles.image}
                  style={{
                    backgroundImage: gardenForm.imageURL ? `url(${gardenForm.imageURL})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                <br />

                <div className={styles.subtopicsmove}>
                  <div className={styles.order}>
                    <FontAwesomeIcon icon={faHeart} className={styles.FontAwesomeIcon} />
                  </div>
                  <div className={styles.subtopics}>
                    {gardenForm.category || 'Uncategorized'}
                  </div>
                </div>

                <div className={styles.header}>{gardenForm.name || 'No Name'}</div>
                <a href="#" onClick={(e) => e.preventDefault()}>Did you know</a>
                <div className={styles.price}></div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Gardenerbox;
