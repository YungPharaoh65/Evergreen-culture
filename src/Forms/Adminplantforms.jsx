import React, { useState } from "react";
import styles from "./Adminforms.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebasedata/firebase";
import { supabase } from "../supabaseClient"; // 👈 Import Supabase


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
    howToPlant: [], // store as array
    category: [],
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle multi-select
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

  // Handle location
  const handleLocationClick = (value) => {
    setForm((prev) => ({ ...prev, location: value }));
  };

  // Handle adding/removing steps for "How to Plant"
  const handleStepChange = (index, value) => {
    const newSteps = [...form.howToPlant];
    newSteps[index] = value;
    setForm({ ...form, howToPlant: newSteps });
  };

  const addStep = () => setForm({ ...form, howToPlant: [...form.howToPlant, ""] });
  const removeStep = (index) => {
    const newSteps = form.howToPlant.filter((_, i) => i !== index);
    setForm({ ...form, howToPlant: newSteps });
  };

  // Upload image to Supabase
  const uploadImageToSupabase = async (file) => {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("plantImages")
      .upload(fileName, file);

    if (error) throw error;

    const { data: publicURLData } = supabase.storage
      .from("plantImages")
      .getPublicUrl(fileName);

    return publicURLData.publicUrl;
  };

  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.kind.length === 0 || form.category.length === 0) {
      alert("Please select at least one kind and category.");
      return;
    }

    try {
      setUploading(true);
      let imageURL = "";
      if (imageFile) imageURL = await uploadImageToSupabase(imageFile);

      const formData = { ...form, imageURL, createdAt: new Date() };

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
        howToPlant: [],
        category: [],
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form: " + error.message);
    } finally {
      setUploading(false);
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

          <label>How to Plant Steps</label>
          {form.howToPlant.map((step, index) => (
            <div key={index} className={styles.StepInput}>
              <input
                type="text"
                value={step}
                placeholder={`Step ${index + 1}`}
                onChange={(e) => handleStepChange(index, e.target.value)}
                required
              />
              <button type="button" onClick={() => removeStep(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addStep}>
            + Add Step
          </button>
        </div>

        <button type="submit" className={styles.SubmitButton} disabled={uploading}>
          {uploading ? "Uploading..." : "Submit Garden"}
        </button>
      </form>
    </div>
  );
}

export default Adminforms;
