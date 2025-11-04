import React, { useState, useEffect } from "react";
import styles from "./Chat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";
import { auth,db } from "./../../Firebasedata/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  // Quick options
  const options = [
    "I have a question about plants",
    "I want to submit feedback",
    "I want to know about gardeners",
  ];

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const q = query(
      collection(db, "chatbotFeedbacks"),
      orderBy("createdAt", "asc")
    );

    const unsubscribeData = onSnapshot(q, (snapshot) => {
      const feedbacks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(feedbacks);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeData();
    };
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (text) => {
    if (!text.trim() || !user) return;

    await addDoc(collection(db, "chatbotFeedbacks"), {
      text,
      userId: user.uid,
      email: user.email,
      createdAt: serverTimestamp(),
    });

    setMessage("");
  };

  const handleOptionClick = (option) => {
    sendMessage(option);
  };

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div className={styles.chatbox}>
          <div className={styles.header}>
            <h4>Evergreen Chat 🌱</h4>
            <button className={styles.closeBtn} onClick={toggleChat}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className={styles.options}>
            {options.map((opt, idx) => (
              <button
                key={idx}
                className={styles.optionBtn}
                onClick={() => handleOptionClick(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className={styles.messageContainer}>
            {messages.map((msg, idx) => {
              const isUserMessage = user?.uid === msg.userId;
              return (
                <div
                  key={idx}
                  className={
                    isUserMessage ? styles.userMessage : styles.botMessage
                  }
                >
                  {msg.text}
                  <br />
                  <small style={{ fontSize: "0.7rem", color: "#555" }}>
                    {msg.email}
                  </small>
                </div>
              );
            })}
          </div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(message)}
            />
            <button onClick={() => sendMessage(message)}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <div className={styles.chatbotButton} onClick={toggleChat}>
          <FontAwesomeIcon icon={faComments} color="#fff" />
        </div>
      )}
    </div>
  );
}

export default Chat;
