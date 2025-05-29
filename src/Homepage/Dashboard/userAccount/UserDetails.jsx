import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./UserDetails.module.css";

function UserDetails() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Dummy data
  const orders = ["Wireless Mouse", "Mechanical Keyboard", "USB-C Hub"];
  const feedback = ["Smooth checkout process", "Fast delivery!", "Great customer service."];

  // Load email from localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail") || "";
    setEmail(storedEmail);
  }, []);

  // Handlers for edit/save toggle
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  return (
    <div className={styles.profileContainer}>
      <Link to="/dashboard">
        <button className={styles.exitButton}>x</button>
      </Link>

      <h2 className={styles.title}>User Profile</h2>

      <div className={styles.inputSection}>
        <p>Email: {email}</p>
        <p>Name: {name}</p>
        <p>Bio: {bio}</p>
        

        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={isEditing}
            placeholder="Enter your name"
          />
        </label>
 

        <label>
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            readOnly={isEditing}
            placeholder="Tell us about yourself"
          />
        </label>
      </div>

      <div>
        {!isEditing ? (
          <button className={styles.editButton} onClick={handleEdit}>
            Edit Profile
          </button>
        ) : (
          <button className={styles.saveButton} onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>

      <br />

      <div className={styles.infoSection}>
        <div className={styles.orders}>
          <h3>Your Orders</h3>
          <ul>
            {orders.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.feedback}>
          <h3>Your Feedback</h3>
          <ul>
            {feedback.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
