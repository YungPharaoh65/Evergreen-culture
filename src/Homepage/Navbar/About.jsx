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
  arrayRemove,
  setDoc,
  query,
  where
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

const plantNamesList = [
  "Aloe Vera", "Silver Fern", "Rosemary", "Lavender", "Bamboo", "Jade Plant",
  "Rose", "Sunflower", "Monstera", "Fiddle Fig", "Peace Lily", "Mint",
  "Bonsai", "Cactus", "Ivy", "Orchid", "Basil", "Thyme", "Sage", "Olive"
];

// ✅ Helper to format date & time
const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function About() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [user, setUser] = useState(null);
  const [onlineCount, setOnlineCount] = useState(0);
  const presenceHeartbeatRef = useRef(null);

  const userEmojiMapRef = useRef({});
  const plantNameMapRef = useRef(JSON.parse(localStorage.getItem("plantNameMap") || "{}"));
  const verifiedMapRef = useRef({});

  // 🌿 Assign random emoji to each user
  const getUserEmoji = (email) => {
    if (!email) return "❓";
    if (userEmojiMapRef.current[email]) return userEmojiMapRef.current[email];
    const assigned = Object.values(userEmojiMapRef.current);
    const available = userEmojisList.filter(e => !assigned.includes(e));
    const chosen = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : userEmojisList[Math.floor(Math.random() * userEmojisList.length)];
    userEmojiMapRef.current[email] = chosen;
    return chosen;
  };

  // 🌱 Assign or retrieve plant name
  const getPlantName = (email) => {
    if (!email) return "Unknown Plant";
    if (plantNameMapRef.current[email]) return plantNameMapRef.current[email];
    const assigned = Object.values(plantNameMapRef.current);
    const available = plantNamesList.filter(p => !assigned.includes(p));
    const chosen = available.length > 0
      ? available[Math.floor(Math.random() * available.length)]
      : plantNamesList[Math.floor(Math.random() * plantNamesList.length)];
    plantNameMapRef.current[email] = chosen;
    localStorage.setItem("plantNameMap", JSON.stringify(plantNameMapRef.current));
    return chosen;
  };

  const isAuthorVerified = (emailOrUid) => !!verifiedMapRef.current[emailOrUid];

  // 🔥 Real-time listeners
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

    const unsubscribeData = onSnapshot(collection(db, "communityTopics"), (snapshot) => {
      setTopics(snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() })));
    });

    const nowWindow = new Date(Date.now() - 60 * 1000);
    const presenceQuery = query(collection(db, "presence"), where("lastActive", ">", nowWindow));
    const unsubscribePresence = onSnapshot(presenceQuery, (snap) => setOnlineCount(snap.size));

    const unsubscribeVerified = onSnapshot(collection(db, "verifiedUsers"), (snap) => {
      const m = {};
      snap.docs.forEach((d) => (m[d.id] = !!d.data()?.verified));
      verifiedMapRef.current = m;
    });

    return () => {
      unsubscribeAuth();
      unsubscribeData();
      unsubscribePresence();
      unsubscribeVerified();
    };
  }, []);

  // 🕓 Presence heartbeat
  useEffect(() => {
    let heartbeatId;
    const startHeartbeat = async (currentUser) => {
      if (!currentUser) return;
      const uid = currentUser.uid;
      const presenceRef = doc(db, "presence", uid);
      await setDoc(presenceRef, { uid, lastActive: new Date(), email: currentUser.email }, { merge: true });

      heartbeatId = setInterval(async () => {
        try {
          await setDoc(presenceRef, { uid, lastActive: new Date(), email: currentUser.email }, { merge: true });
        } catch (err) {
          console.error("presence heartbeat error", err);
        }
      }, 25000);
      presenceHeartbeatRef.current = heartbeatId;
    };

    const stopHeartbeat = async (currentUser) => {
      if (presenceHeartbeatRef.current) {
        clearInterval(presenceHeartbeatRef.current);
        presenceHeartbeatRef.current = null;
      }
      if (currentUser) {
        try {
          await deleteDoc(doc(db, "presence", currentUser.uid));
        } catch (_) {}
      }
    };

    if (user) startHeartbeat(user);
    else stopHeartbeat(user);

    return () => {
      if (heartbeatId) clearInterval(heartbeatId);
    };
  }, [user]);

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
    if (!text?.trim() || !user) return;
    const topicRef = doc(db, "communityTopics", topicId);
    const commentObj = { text, email: user.email, uid: user.uid, createdAt: new Date() };
    await updateDoc(topicRef, { comments: arrayUnion(commentObj) });
    setCommentInputs((prev) => ({ ...prev, [topicId]: "" }));
  };

  const deleteComment = async (topicId, commentObj) => {
    if (!user || user.email !== commentObj.email) return;
    await updateDoc(doc(db, "communityTopics", topicId), { comments: arrayRemove(commentObj) });
  };

  const deleteTopic = async (topicId) => {
    if (!user) return;
    await deleteDoc(doc(db, "communityTopics", topicId));
  };

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      {/* 🌿 Floating Active Users Button */}
      <div
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          backgroundColor: "#079f41ff",
          color: "white",
          padding: "10px 15px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          fontWeight: "500",
          zIndex: 1000,
          cursor: "pointer",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        🌱 {onlineCount} people active now{" "}
        {user && (
          <span>
            (You {user.emailVerified ? "✅" : "🔒"})
          </span>
        )}
      </div>

      <div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "700px" }}>
          <h1 style={{ textAlign: "center" }}>Community 🌿</h1>
          <p style={{ textAlign: "center" }}>Start a new discussion or join an existing one!</p>

          {/* Create Topic */}
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
                color: "black",
                border: "1px solid black",
              }}
            >
              Post Topic
            </button>
          </div>

          {/* Topics */}
          {topics.map((topic) => (
            <div
              key={topic.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
              }}
            >
              <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  {topic.title}
                  <div style={{ fontSize: "0.8rem", color: "#777" }}>{formatDate(topic.createdAt)}</div>
                </div>
                {user?.uid === topic.authorId && (
                  <button onClick={() => deleteTopic(topic.id)}>🗑️</button>
                )}
              </h3>

              <div style={{ marginLeft: "1rem" }}>
                {(!topic.comments || topic.comments.length === 0) ? (
                  <p style={{ color: "#888" }}>No comments yet.</p>
                ) : (
                  topic.comments.map((cmt, idx) => {
                    const isUserComment = user?.email === cmt.email;
                    const emoji = getUserEmoji(cmt.email);
                    const plantName = getPlantName(cmt.email);
                    const verified = isAuthorVerified(cmt.email) || isAuthorVerified(cmt.uid);
                    return (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          justifyContent: isUserComment ? "flex-start" : "flex-end",
                          alignItems: "center",
                          padding: "0.3rem 0",
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
                            fontSize: "1rem",
                          }}
                        >
                          <span style={{ fontSize: "1.4rem" }}>{emoji}</span>
                          <div>
                            <strong>{plantName}</strong>
                            {verified && <span style={{ marginLeft: 8 }} title="Verified">✅</span>}
                            <div style={{ marginTop: 4 }}>{cmt.text}</div>
                            <div style={{ color: "#666", fontSize: "0.8rem", marginTop: "4px" }}>
                              {formatDate(cmt.createdAt)}
                            </div>
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

          {/* BOTTOM SECTION */}
          <div className={styles.secondSection}>
            <div className={styles.logoheader}>
              Evergreen <FontAwesomeIcon icon={faSeedling} color="#25D366" />
            </div>
          </div>

          <div className={styles.secondSection}>
            <p className={styles.text}>
              ( click the word{" "}
              <b
                onClick={() => navigate("/Choosepath")}
                style={{ color: "#2c7446ff", cursor: "pointer" }}
              >
                dashboard
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
