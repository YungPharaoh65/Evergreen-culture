import React, { useEffect, useState } from "react";
import styles from "./Gardenplant.module.css";
import { Link } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../Firebasedata/firebase";
import { supabase } from "../../../supabaseClient"; // ✅ import Supabase client
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


function Gardenerbox() {
  const [gardenForms, setGardenForms] = useState([]);
  const [filteredGardenForms, setFilteredGardenForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [availableCategories, setAvailableCategories] = useState([]);

  // ✅ Upload states
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [plantName, setPlantName] = useState("");
  const [plantCategory, setPlantCategory] = useState("");

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

  // ✅ Upload Image Function
  const handleImageUpload = async () => {
    if (!selectedImage || !plantName || !plantCategory) {
      alert("Please fill in all fields and choose an image.");
      return;
    }

    setUploading(true);

    try {
      const fileName = `${Date.now()}_${selectedImage.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from("plantImages")
        .upload(fileName, selectedImage);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("plantImages").getPublicUrl(fileName);

      await addDoc(collection(db, "gardenForms"), {
        name: plantName,
        category: plantCategory,
        imageURL: publicUrl,
        createdAt: new Date(),
      });

      alert("✅ Plant uploaded successfully!");
      setPlantName("");
      setPlantCategory("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Check your Supabase setup.");
    } finally {
      setUploading(false);
    }
  };

  return (
      <div>
<br /><br />
      {/* ✅ Category Filter */}
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

      {/* ✅ Garden Cards */}
      {loading && <p>Loading garden forms...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className={styles.centerbar2}>
        {filteredGardenForms.map((gardenForm) => (
          <Link to={`/Plantdetails/${gardenForm.id}`} key={gardenForm.id}>
            <div className={styles.dashboardContainer2}>
              <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${gardenForm.imageURL})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>

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
