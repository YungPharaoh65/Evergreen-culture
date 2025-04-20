import React, { useState } from "react";
import styles from "./Adminforms.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebasedata/firebase";

function Adminforms() {
  const [form, setForm] = useState({
    name: "",
    about: "",
    weather: "",
    kind: [],
    location: "",
    water: "",
    placement: "",
    nutrients: "",
    howToPlant: "",
    category: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSelection = (field, value, maxAllowed) => {
    setForm((prev) => {
      const current = prev[field];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : current.length < maxAllowed
        ? [...current, value]
        : current;

      return { ...prev, [field]: updated };
    });
  };

  const handleLocationClick = (value) => {
    setForm((prev) => ({ ...prev, location: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.kind.length === 0) {
      alert("Please select at least one kind of garden.");
      return;
    }

    if (form.category.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    try {
      const formData = {
        ...form,
        createdAt: new Date(),
      };

      console.log("Submitting to Firestore:", formData);

      await addDoc(collection(db, "gardenForms"), formData);

      alert("Form submitted successfully!");

      setForm({
        name: "",
        about: "",
        weather: "",
        kind: [],
        location: "",
        water: "",
        placement: "",
        nutrients: "",
        howToPlant: "",
        category: [],
      });
    } catch (error) {
      console.error("Firestore error:", error);
      alert("Error submitting form: " + error.message);
    }
  };

  return (
    <div className={styles.DashboardContainer}>
      <form className={styles.PlantForm} onSubmit={handleSubmit}>
        <div className={styles.Section}>
          <h2>Plant Orders</h2>

          <h2>Filter Category (Select up to 4)</h2>
          <div className={styles.ButtonGroup}>
            {["Guide Survivors", "Early Bloomers", "Pest Controlled", "Other"].map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => toggleSelection("category", cat, 4)}
                className={form.category.includes(cat) ? styles.Active : ""}
              >
                {cat}
              </button>
            ))}
          </div>

          <label>Name of Garden</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />

          <label>About Garden</label>
          <input type="text" name="about" value={form.about} onChange={handleChange} required />

          <label>Weather</label>
          <div className={styles.RadioGroup}>
            {["summer", "autumn", "winter", "spring"].map((season) => (
              <label key={season}>
                <input
                  type="radio"
                  name="weather"
                  value={season}
                  checked={form.weather === season}
                  onChange={handleChange}
                />
                {season}
              </label>
            ))}
          </div>

          <label>Kind of Garden (Select up to 2)</label>
          <div className={styles.RadioGroup}>
            {["Invasive", "Friendly", "Planted Alone"].map((kind) => (
              <label key={kind}>
                <input
                  type="checkbox"
                  name="kind"
                  value={kind}
                  checked={form.kind.includes(kind)}
                  onChange={() => toggleSelection("kind", kind, 2)}
                />
                {kind}
              </label>
            ))}
          </div>

          <label>Indoor / Outdoor</label>
          <div className={styles.ButtonGroup}>
            {["Indoor", "Outdoor"].map((loc) => (
              <button
                type="button"
                key={loc}
                onClick={() => handleLocationClick(loc)}
                className={form.location === loc ? styles.Active : ""}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.Section}>
          <h2>How to Plant</h2>

          <label>Water (amount)</label>
          <input type="text" name="water" value={form.water} onChange={handleChange} required />

          <label>Placement</label>
          <input type="text" name="placement" value={form.placement} onChange={handleChange} required />

          <label>Nutrients</label>
          <input type="text" name="nutrients" value={form.nutrients} onChange={handleChange} required />

          <label>How to Plant</label>
          <input type="text" name="howToPlant" value={form.howToPlant} onChange={handleChange} required />
        </div>

        <button type="submit" className={styles.SubmitButton}>Submit Garden</button>
      </form>
    </div>
  );
}

export default Adminforms;
