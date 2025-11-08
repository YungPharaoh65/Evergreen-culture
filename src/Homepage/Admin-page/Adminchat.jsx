import { collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../Firebasedata/firebase";
import styles from "./Adminchat.module.css";

function AdminChat() {
  const [users, setUsers] = useState([]); // list of users who have chatted
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState("");

  // Fetch users who have chat documents
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "chatbotMessages"), (snapshot) => {
      const usersList = snapshot.docs.map(doc => ({ id: doc.id }));
      setUsers(usersList);
    });
    return () => unsubscribe();
  }, []);

  // Fetch messages of the active user
  useEffect(() => {
    if (!activeUser) return;
    const messagesRef = collection(db, "chatbotMessages", activeUser.id, "messages");
    const q = query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatData = snapshot.docs.map(doc => doc.data());
      setMessages(chatData);
    });
    return () => unsubscribe();
  }, [activeUser]);

  // Send admin message
  const handleSend = async () => {
    if (!replyText.trim() || !activeUser) return;
    try {
      await addDoc(collection(db, "chatbotMessages", activeUser.id, "messages"), {
        sender: "admin",
        text: replyText,
        createdAt: new Date(),
      });
      setReplyText("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatSidebar}>
        <h3>Chat Users</h3>
        {users.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              onClick={() => setActiveUser(user)}
              className={`${styles.userListItem} ${
                activeUser?.id === user.id ? styles.activeUser : ""
              }`}
            >
              {user.id}
            </div>
          ))
        )}
      </div>

      <div className={styles.chatWindow}>
        {activeUser ? (
          <>
            <h3>Chat with: {activeUser.id}</h3>
            <div className={styles.messageBox}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={
                    msg.sender === "admin"
                      ? styles.adminMessage
                      : styles.userMessage
                  }
                >
                  <strong>{msg.sender === "admin" ? "Admin: " : "User: "}</strong>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className={styles.inputArea}>
              <input
                type="text"
                placeholder="Type your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <p>Select a user to view and reply to messages.</p>
        )}
      </div>
    </div>
  );
}

export default AdminChat;
