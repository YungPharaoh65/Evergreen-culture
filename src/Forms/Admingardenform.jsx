import React, { useState, useEffect } from "react";
import styles from "./Adminforms.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebasedata/firebase"; // assumes Firestore
import { getAuth } from "firebase/auth";
import { supabase } from "../supabaseClient";

function Admingardenform() {
  const [form, setForm] = useState({
    fullName: "",
    preferredLocation: "",
    idNumber: "",
    filters: [],
    customFilter: "",
    aboutMe: "",
    availability: "",
    profileImage: null,
  });

  const [formErrors, setFormErrors] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) setImagePreview(storedImage);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterToggle = (filter) => {
    setForm((prev) => {
      const updatedFilters = prev.filters.includes(filter)
        ? prev.filters.filter((f) => f !== filter)
        : [...prev.filters, filter];
      return updatedFilters.length <= 3 ? { ...prev, filters: updatedFilters } : prev;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Only image files are allowed.");
      return;
    }

    setImageError(null);
    setForm((prev) => ({ ...prev, profileImage: file }));

    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);
    localStorage.setItem("profileImage", previewURL);
  };

  // ✅ Upload image to Supabase (gardenImage bucket)
  const uploadImageToSupabase = async (file) => {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("gardenImage") // your separate bucket
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

      if (error) throw error;

      const { data: publicData } = supabase.storage
        .from("gardenImage")
        .getPublicUrl(fileName);

      if (!publicData || !publicData.publicUrl) {
        throw new Error("Could not get public image URL");
      }

      return publicData.publicUrl;
    } catch (err) {
      console.error("Supabase upload failed:", err.message);
      throw new Error("Image upload failed");
    }
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];
    if (!form.fullName) errors.push("Full Name is required.");
    if (!form.preferredLocation) errors.push("Preferred Location is required.");
    if (!form.idNumber) errors.push("ID Number is required.");
    if (form.filters.length === 0) errors.push("At least one filter must be selected.");
    if (form.filters.includes("Other") && !form.customFilter) errors.push("Please specify the custom filter.");
    if (!form.availability) errors.push("Availability is required.");

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setUploading(true);

      let profileImageURL = null;
      if (form.profileImage) {
        profileImageURL = await uploadImageToSupabase(form.profileImage);
      }

      const gardenerData = {
        fullName: form.fullName,
        preferredLocation: form.preferredLocation,
        idNumber: form.idNumber,
        filters: form.filters,
        customFilter: form.customFilter || "",
        aboutMe: form.aboutMe || "",
        availability: form.availability,
        profileImageURL: profileImageURL || "",
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "gardeners"), gardenerData);

      alert("Gardener information submitted successfully!");

      // Reset form
      setForm({
        fullName: "",
        preferredLocation: "",
        idNumber: "",
        filters: [],
        customFilter: "",
        aboutMe: "",
        availability: "",
        profileImage: null,
      });
      setFormErrors([]);
      setImagePreview(null);
      localStorage.removeItem("profileImage");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.GardenerFormContainer}>
      <form onSubmit={handleSubmit} className={styles.GardenerForm}>
        <h2>Gardener Registration</h2>

        <label>Full Name</label>
        <input type="text" name="fullName" value={form.fullName} onChange={handleChange} />

        <label>Preferred Location</label>
        <input type="text" name="preferredLocation" value={form.preferredLocation} onChange={handleChange} />

        <label>ID Number</label>
        <input type="text" name="idNumber" value={form.idNumber} onChange={handleChange} />

        <label>Filters (up to 3)</label>
        <div className={styles.FilterGroup}>
          {["Formal Garden", "Landscaping", "Other"].map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => handleFilterToggle(filter)}
              className={form.filters.includes(filter) ? styles.Active : ""}
            >
              {filter}
            </button>
          ))}
        </div>

        {form.filters.includes("Other") && (
          <>
            <label>Specify Other</label>
            <input type="text" name="customFilter" value={form.customFilter} onChange={handleChange} />
          </>
        )}

        <label>About Me</label>
        <textarea name="aboutMe" value={form.aboutMe} onChange={handleChange} />

        <label>Availability</label>
        <div className={styles.AvailabilityGroup}>
          {["Weekdays", "Weekends", "Flexible"].map((val) => (
            <label key={val}>
              <input
                type="radio"
                name="availability"
                value={val}
                checked={form.availability === val}
                onChange={handleChange}
              />
              {val}
            </label>
          ))}
        </div>

        <label>Upload Profile Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {imagePreview && <img src={imagePreview} alt="Preview" width="100" />}

        {imageError && <p>{imageError}</p>}
        {formErrors.length > 0 && (
          <ul>
            {formErrors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        )}

        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Admingardenform;
