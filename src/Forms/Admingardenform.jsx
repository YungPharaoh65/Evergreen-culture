import React, { useState, useEffect } from "react";
import styles from "./Adminforms.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebasedata/firebase"; // assumes Firestore
import { getAuth } from "firebase/auth";

function Admingardenform() {
  const [form, setForm] = useState({
    fullName: "",
    preferredLocation: "",
    idNumber: "",
    filters: [],
    customFilter: "",
    aboutMe: "",
    availability: "",
    certifiedId: null,
    certification: null,
    resume: null,
    profileImage: null,
  });

  const [formErrors, setFormErrors] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState(null); // New state for image errors

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setImagePreview(storedImage);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterToggle = (filter) => {
    setForm((prev) => {
      const alreadySelected = prev.filters.includes(filter);
      const updatedFilters = alreadySelected
        ? prev.filters.filter((f) => f !== filter)
        : [...prev.filters, filter];

      return updatedFilters.length <= 3
        ? { ...prev, filters: updatedFilters }
        : prev;
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    // File validation: Check file type and size
    if (file) {
      const fileType = file.type.split("/")[0]; // Extract type (image, video, etc.)
      const fileSize = file.size / 1024 / 1024; // Convert bytes to MB

      if (fileType !== "image") {
        setImageError("Only image files are allowed.");
        return;
      } else if (fileSize > 5) { // Limit to 5MB
        setImageError("File size should not exceed 5MB.");
        return;
      } else {
        setImageError(null); // Clear any previous error
      }

      setForm((prev) => ({ ...prev, [name]: file }));

      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      localStorage.setItem("profileImage", imageURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    // Basic validation
    if (!form.fullName) errors.push("Full Name is required.");
    if (!form.preferredLocation) errors.push("Preferred Location is required.");
    if (!form.idNumber) errors.push("ID Number is required.");
    if (form.filters.length === 0) errors.push("At least one filter must be selected.");
    if (!form.availability) errors.push("Availability is required.");

    // Custom filter validation if "Other" is selected
    if (form.filters.includes("Other") && !form.customFilter) {
      errors.push("Please specify the custom filter.");
    }

    // If errors are present, set them and stop submission
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const gardenerData = {
        fullName: form.fullName,
        preferredLocation: form.preferredLocation,
        idNumber: form.idNumber,
        filters: form.filters,
        customFilter: form.customFilter || "",
        aboutMe: form.aboutMe || "",
        availability: form.availability || "",
        createdAt: new Date(),
      };

      await addDoc(collection(db, "gardeners"), gardenerData);

      alert("Gardener information submitted successfully!");
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
      localStorage.removeItem("profileImage");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <div className={styles.GardenerFormContainer}>
      <form onSubmit={handleSubmit} className={styles.GardenerForm}>
        <h2>Gardener Registration</h2>

        {/* Form Fields */}
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <label>Preferred Location of Work</label>
        <input
          type="text"
          name="preferredLocation"
          value={form.preferredLocation}
          onChange={handleChange}
          required
        />

        <label>ID Number</label>
        <input
          type="text"
          name="idNumber"
          value={form.idNumber}
          onChange={handleChange}
          required
        />

        <label>Filter (Select up to 3)</label>
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
            <input
              type="text"
              name="customFilter"
              value={form.customFilter}
              onChange={handleChange}
            />
          </>
        )}

        <label>About Me</label>
        <textarea
          name="aboutMe"
          value={form.aboutMe}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
        />

        <label>Availability</label>
        <div className={styles.AvailabilityGroup}>
          <label>
            <input
              type="radio"
              name="availability"
              value="Weekdays"
              checked={form.availability === "Weekdays"}
              onChange={handleChange}
            />
            Weekdays
          </label>
          <label>
            <input
              type="radio"
              name="availability"
              value="Weekends"
              checked={form.availability === "Weekends"}
              onChange={handleChange}
            />
            Weekends
          </label>
          <label>
            <input
              type="radio"
              name="availability"
              value="Flexible"
              checked={form.availability === "Flexible"}
              onChange={handleChange}
            />
            Flexible
          </label>
        </div>

        <label>Upload Profile Image</label>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleFileChange}
        />

        {imagePreview && (
          <div className={styles.ImagePreview}>
            <img src={imagePreview} alt="Profile Preview" width="100" />
          </div>
        )}

        {imageError && <div className={styles.ImageError}>{imageError}</div>}

        {formErrors.length > 0 && (
          <div className={styles.ErrorMessages}>
            <ul>
              {formErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit" className={styles.SubmitButton}>
          Submit Gardener Info
        </button>
      </form>
    </div>
  );
}

export default Admingardenform;
