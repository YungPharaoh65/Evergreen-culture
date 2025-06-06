import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "./About.module.css"; // Optional CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSeedling } from "@fortawesome/free-solid-svg-icons";

function About() {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [commentInputs, setCommentInputs] = useState({});
  const [editingComment, setEditingComment] = useState({});
  const [editingTopic, setEditingTopic] = useState({});

  const handleNewTopic = () => {
    if (newTopic.trim() === "") return;
    setTopics([...topics, { title: newTopic, comments: [] }]);
    setNewTopic("");
  };

  const handleCommentChange = (index, value) => {
    setCommentInputs({ ...commentInputs, [index]: value });
  };

  const addComment = (index) => {
    const comment = commentInputs[index];
    if (!comment || comment.trim() === "") return;

    const updatedTopics = [...topics];
    updatedTopics[index].comments.push(comment);
    setTopics(updatedTopics);
    setCommentInputs({ ...commentInputs, [index]: "" });
  };

  const deleteComment = (topicIndex, commentIndex) => {
    const updatedTopics = [...topics];
    updatedTopics[topicIndex].comments.splice(commentIndex, 1);
    setTopics(updatedTopics);
  };

  const editComment = (topicIndex, commentIndex, newText) => {
    const updatedTopics = [...topics];
    updatedTopics[topicIndex].comments[commentIndex] = newText;
    setTopics(updatedTopics);
    setEditingComment({});
  };

  const deleteTopic = (index) => {
    const updatedTopics = [...topics];
    updatedTopics.splice(index, 1);
    setTopics(updatedTopics);
  };

  const updateTopicTitle = (index, newTitle) => {
    const updatedTopics = [...topics];
    updatedTopics[index].title = newTitle;
    setTopics(updatedTopics);
    setEditingTopic({});
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "700px" }}>
          <h1 style={{ textAlign: "center" }}> Community 🌱</h1>
          <p style={{ textAlign: "center" }}>Start a new discussion or join an existing one!</p>

          {/* New Topic Input */}
          <div style={{ marginBottom: "2rem", textAlign: "center" }}>
            <input
              type="text"
              placeholder="Start a new topic..."
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              style={{
                padding: "0.5rem",
                width: "70%",
                maxWidth: "400px",
                marginBottom: "0.5rem",
              }}
            />
            <br />
            <button onClick={handleNewTopic}>Post Topic</button>
          </div>

          {/* Topic List */}
          {topics.map((topic, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                marginBottom: "1.5rem",
                position: "relative",
              }}
              onMouseEnter={() => setEditingTopic({ ...editingTopic, [index]: true })}
              onMouseLeave={() => setEditingTopic({ ...editingTopic, [index]: false })}
            >
              {editingTopic[index + "_editing"] ? (
                <div>
                  <input
                    type="text"
                    value={topic.title}
                    onChange={(e) =>
                      updateTopicTitle(index, e.target.value)
                    }
                    style={{ width: "100%", marginBottom: "0.5rem" }}
                  />
                  <button
                    onClick={() =>
                      updateTopicTitle(index, topic.title)
                    }
                  >
                    <FontAwesomeIcon icon={faSeedling} color="#25D366"  className={styles.FontAwesomeIcon} />
                  </button>
                </div>
              ) : (
                <h3 style={{ display: "flex", justifyContent: "space-between" }}>
                  {topic.title}
                  {editingTopic[index] && (
                    <span>
                      <button
                        onClick={() =>
                          setEditingTopic({ ...editingTopic, [index + "_editing"]: true })
                        }
                      >
                        ✏️
                      </button>
                      <button onClick={() => deleteTopic(index)}>🗑️</button>
                    </span>
                  )}
                </h3>
              )}

              {/* Comments */}
              <div style={{ marginLeft: "1rem" }}>
                {topic.comments.length === 0 && (
                  <p style={{ color: "#888" }}>No comments yet.</p>
                )}
                {topic.comments.map((cmt, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.3rem 0",
                      position: "relative",
                    }}
                    onMouseEnter={() =>
                      setEditingComment({ ...editingComment, [`${index}-${i}`]: true })
                    }
                    onMouseLeave={() =>
                      setEditingComment({ ...editingComment, [`${index}-${i}`]: false })
                    }
                  >
                    {editingComment[`${index}-${i}_editing`] ? (
                      <input
                        value={cmt}
                        onChange={(e) => {
                          const updatedTopics = [...topics];
                          updatedTopics[index].comments[i] = e.target.value;
                          setTopics(updatedTopics);
                        }}
                        style={{ flex: 1, marginRight: "0.5rem" }}
                      />
                    ) : (
                      <span>💬 {cmt}</span>
                    )}

                    {editingComment[`${index}-${i}`] && (
                      <span>
                        {editingComment[`${index}-${i}_editing`] ? (
                          <button
                            onClick={() =>
                              setEditingComment({
                                ...editingComment,
                                [`${index}-${i}_editing`]: false,
                              })
                            }
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              setEditingComment({
                                ...editingComment,
                                [`${index}-${i}_editing`]: true,
                              })
                            }
                          >
                            ✏️
                          </button>
                        )}
                        <button onClick={() => deleteComment(index, i)}>🗑️</button>
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInputs[index] || ""}
                  onChange={(e) => handleCommentChange(index, e.target.value)}
                  style={{ padding: "0.4rem", width: "70%" }}
                />
                <button onClick={() => addComment(index)} style={{ marginLeft: "0.5rem" }}>
                  Comment
                </button>
              </div>
            </div>
          ))}

{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/} 
 <div className={styles.secondSection}>
  <div className={styles.logoheader}> Evergreen <FontAwesomeIcon icon={faSeedling} color="#25D366"  className={styles.FontAwesomeIcon} /></div>
 </div>

<div className={styles.secondSection}>
 <p className={styles.text}>its more than just a website, its a digital geography of nature</p>
 </div>

          <div className={styles.secondSection}>

 <FontAwesomeIcon icon={faWhatsapp} color="#25D366"  className={styles.FontAwesomeIcon} />
          <FontAwesomeIcon icon={faInstagram} color="#E1306C"  className={styles.FontAwesomeIcon} />
      <FontAwesomeIcon icon={faTwitter} color="#1DA1F2"  className={styles.FontAwesomeIcon} />
          </div>
{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}{/*BOTTOM TEXT*/}


           
        </div>
       
      </div>
    </div>
  );
}

export default About;
