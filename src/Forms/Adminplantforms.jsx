import React, { useState } from "react";
import styles from "./Adminforms.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebasedata/firebase";
import { supabase } from "../supabaseClient";

function Adminplantforms() {
  const [form, setForm] = useState({
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

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSelection = (field, value, maxAllowed) => {
    setForm((prev) => {
      const current = prev[field] || [];
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

  const handleStepChange = (index, value) => {
    const newSteps = [...form.howToPlant];
    newSteps[index] = value;
    setForm({ ...form, howToPlant: newSteps });
  };

  const addStep = () => setForm({ ...form, howToPlant: [...form.howToPlant, ""] });
  const removeStep = (index) => setForm({ ...form, howToPlant: form.howToPlant.filter((_, i) => i !== index) });

  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  // ✅ Fixed Supabase upload
  const uploadImageToSupabase = async (file) => {
    if (!file) return "";
    const fileName = `${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("plantImages")
      .upload(fileName, file);
    if (uploadError) throw uploadError;

    const { data: publicURLData } = supabase.storage
      .from("plantImages")
      .getPublicUrl(fileName);

    return publicURLData.publicUrl || "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.kind.length || !form.category.length) {
      alert("Please select at least one kind and category.");
      return;
    }

    try {
      setUploading(true);
      let imageURL = "";
      if (imageFile) {
        imageURL = await uploadImageToSupabase(imageFile);
      }

      await addDoc(collection(db, "gardenForms"), { ...form, imageURL, createdAt: new Date() });

      alert("Garden successfully added 🌿");
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
    } catch (err) {
      console.error(err);
      alert("Error submitting form: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.DashboardContainer}>
      <form className={styles.PlantForm} onSubmit={handleSubmit}>
        <h2>Plant Orders</h2>

        <label>Filter Category (up to 4)</label>
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
              <input type="radio" name="weather" value={season} checked={form.weather === season} onChange={handleChange} />
              {season}
            </label>
          ))}
        </div>

        <label>Kind of Garden (up to 2)</label>
        <div className={styles.RadioGroup}>
          {["Invasive", "Friendly", "Planted Alone"].map((kind) => (
            <label key={kind}>
              <input type="checkbox" checked={form.kind.includes(kind)} onChange={() => toggleSelection("kind", kind, 2)} />
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

        <label>Upload Plant Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imageFile && <p>Selected file: {imageFile.name}</p>}

        <h2>How to Plant</h2>
        <label>Water</label>
        <input type="text" name="water" value={form.water} onChange={handleChange} required />
        <label>Placement</label>
        <input type="text" name="placement" value={form.placement} onChange={handleChange} required />
        <label>Nutrients</label>
        <input type="text" name="nutrients" value={form.nutrients} onChange={handleChange} required />

        <label>Steps</label>
        {form.howToPlant.map((step, idx) => (
          <div key={idx}>
            <input type="text" value={step} placeholder={`Step ${idx + 1}`} onChange={(e) => handleStepChange(idx, e.target.value)} required />
            <button type="button" onClick={() => removeStep(idx)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addStep}>+ Add Step</button>

        <button type="submit" disabled={uploading}>{uploading ? "Uploading..." : "Submit Garden"}</button>
      </form>
    </div>
  );
}

export default Adminplantforms;
