import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../../Firebasedata/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "./About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

const userEmojisList = [
  "😄", "😎", "🤓", "🧐", "🤠", "🧙‍♂️", "🧛‍♀️", "🧟‍♂️", "👽", "🤖", "👻", "😆", "🦊", "🐼", "🐸"
];

function About() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Map of userEmail to emoji
  const userEmojiMapRef = useRef({});

  // Helper: Get or assign emoji to user email
  const getUserEmoji = (email) => {
    if (!email) return "❓";
    if (userEmojiMapRef.current[email]) {
      return userEmojiMapRef.current[email];
    } else {
      // Assign a random emoji not yet assigned (try to avoid duplicates)
      const assignedEmojis = Object.values(userEmojiMapRef.current);
      const availableEmojis = userEmojisList.filter(e => !assignedEmojis.includes(e));
      const emojiToAssign = availableEmojis.length > 0
        ? availableEmojis[Math.floor(Math.random() * availableEmojis.length)]
        : userEmojisList[Math.floor(Math.random() * userEmojisList.length)];
      userEmojiMapRef.current[email] = emojiToAssign;
      return emojiToAssign;
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const unsubscribeData = onSnapshot(collection(db, "communityTopics"), (snapshot) => {
      const topicData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTopics(topicData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeData();
    };
  }, []);

  const handleNewTopic = async () => {
    if (!newTopic.trim() || !user) return;
    await addDoc(collection(db, "communityTopics"), {
      title: newTopic,
      comments: [],
      authorId: user.uid,
      createdAt: new Date()
    });
    setNewTopic("");
  };

  const addComment = async (topicId, text) => {
    if (!text.trim() || !user) return;
    const topicRef = doc(db, "communityTopics", topicId);
    const commentObj = { text, email: user.email };
    await updateDoc(topicRef, {
      comments: arrayUnion(commentObj)
    });
    setCommentInputs((prev) => ({ ...prev, [topicId]: "" }));
  };

  const deleteComment = async (topicId, commentObj) => {
    if (!user || user.email !== commentObj.email) return;
    const topicRef = doc(db, "communityTopics", topicId);
    await updateDoc(topicRef, {
      comments: arrayRemove(commentObj)
    });
  };

  const deleteTopic = async (topicId) => {
    if (!user) return;
    await deleteDoc(doc(db, "communityTopics", topicId));
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "700px" }}>
          <h1 style={{ textAlign: "center" }}> Community 🌱</h1>
          <p style={{ textAlign: "center" }}>Start a new discussion or join an existing one!</p>

          <div style={{ marginBottom: "2rem", textAlign: "center" }}>
            <input
              type="text"
              placeholder="Start a new topic..."
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              style={{ padding: "0.5rem", width: "70%", maxWidth: "400px", marginBottom: "0.5rem" }}
            />
            <br />
            <button
              onClick={handleNewTopic}
              style={{
                padding: ".5rem",
                borderRadius: "8px",
                backgroundColor: "inherit",
                marginBottom: "1.5rem",
                border: "1px solid black"
              }}
            >
              Post Topic
            </button>
          </div>

          {topics.map((topic) => (
            <div
              key={topic.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem"
              }}
            >
              <h3 style={{ display: "flex", justifyContent: "space-between" }}>
                {topic.title}
                {user?.uid === topic.authorId && (
                  <button onClick={() => deleteTopic(topic.id)}>🗑️</button>
                )}
              </h3>

              <div style={{ marginLeft: "1rem" }}>
                {topic.comments.length === 0 ? (
                  <p style={{ color: "#888" }}>No comments yet.</p>
                ) : (
                  topic.comments.map((cmt, idx) => {
                    const isUserComment = user?.email === cmt.email;
                    const emoji = getUserEmoji(cmt.email);
                    return (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          justifyContent: isUserComment ? "flex-start" : "flex-end",
                          alignItems: "center",
                          padding: "0.3rem 0"
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: isUserComment ? "#dcf8c6" : "#eee",
                            color: "#000",
                            padding: "0.5rem 0.75rem",
                            borderRadius: "15px",
                            maxWidth: "70%",
                            wordBreak: "break-word",
                            textAlign: isUserComment ? "left" : "right",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "1rem"
                          }}
                        >
                          <span style={{ fontSize: "1.4rem" }}>{emoji}</span>
                          <div>
                            {cmt.text}
                            <br />
                            <small style={{ color: "#555", fontSize: "0.8rem" }}>— {cmt.email}</small>
                          </div>
                        </div>
                        {isUserComment && (
                          <button
                            onClick={() => deleteComment(topic.id, cmt)}
                            style={{ marginLeft: "0.5rem" }}
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInputs[topic.id] || ""}
                  onChange={(e) =>
                    setCommentInputs((prev) => ({ ...prev, [topic.id]: e.target.value }))
                  }
                  style={{ padding: "0.4rem", width: "70%" }}
                />
                <button
                  onClick={() => addComment(topic.id, commentInputs[topic.id])}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Comment
                </button>
              </div>
            </div>
          ))}

          {/* BOTTOM TEXT & SOCIALS */}
          <div className={styles.secondSection}>
            <div className={styles.logoheader}>
              Evergreen <FontAwesomeIcon icon={faSeedling} color="#25D366" className={styles.FontAwesomeIcon} />
            </div>
          </div>

          <div className={styles.secondSection}>
            <p className={styles.text}>
              ( click the word{" "}
              <b
                onClick={() => navigate("/Choosepath")}
                style={{ color: "#2c7446ff", cursor: "pointer" }}
              >
                "dashboard"
              </b>{" "}
              to see your options )
            </p>
          </div>

          <div className={styles.secondSection}>
            <FontAwesomeIcon icon={faWhatsapp} color="#25D366" className={styles.FontAwesomeIcon} />
            <FontAwesomeIcon icon={faInstagram} color="#E1306C" className={styles.FontAwesomeIcon} />
            <FontAwesomeIcon icon={faTwitter} color="#1DA1F2" className={styles.FontAwesomeIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
