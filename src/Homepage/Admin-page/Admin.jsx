import Admingardenform from "../../Forms/Admingardenform";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "../../Firebasedata/firebase";
import Adminplantforms from "../../Forms/Adminplantforms";
import { getDocs, collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import styles from "./Admin.module.css";
import Adminforms from "../../Forms/Adminplantforms";

function AdminPage() {
  const [activeView, setActiveView] = useState("home");
  const [gardenerData, setGardenerData] = useState([]);
  const [gardenFormData, setGardenFormData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [communityTopics, setCommunityTopics] = useState([]);
  const [chatbotFeedbacks, setChatbotFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // FETCH FUNCTIONS
  const fetchGardenerData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "gardeners"));
      setGardenerData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching gardener data:", error);
    }
  };

  const fetchGardenFormData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "gardenForms"));
      setGardenFormData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching garden form data:", error);
    }
  };

  const fetchFeedbackData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "feedbacks"));
      setFeedbackData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  // Realtime updates for Community Topics
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "communityTopics"),
      snapshot => {
        setCommunityTopics(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      error => console.error("Error fetching community topics:", error)
    );

    return () => unsubscribe();
  }, []);

  // Realtime updates for Chatbot Feedback
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "chatbotFeedbacks"),
      snapshot => {
        setChatbotFeedbacks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      error => console.error("Error fetching chatbot feedbacks:", error)
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchGardenerData();
    fetchGardenFormData();
    fetchFeedbackData();
  }, []);

  useEffect(() => {
    if (
      gardenerData.length >= 0 &&
      gardenFormData.length >= 0 &&
      feedbackData.length >= 0 &&
      communityTopics.length >= 0 &&
      chatbotFeedbacks.length >= 0
    ) {
      setLoading(false);
    }
  }, [gardenerData, gardenFormData, feedbackData, communityTopics, chatbotFeedbacks]);

  // DELETE FUNCTIONS
  const handleDeleteGardener = async (id) => {
    if (window.confirm("Are you sure you want to delete this gardener?")) {
      await deleteDoc(doc(db, "gardeners", id));
      setGardenerData(gardenerData.filter(g => g.id !== id));
    }
  };

  const handleDeleteGardenForm = async (id) => {
    if (window.confirm("Are you sure you want to delete this garden form?")) {
      await deleteDoc(doc(db, "gardenForms", id));
      setGardenFormData(gardenFormData.filter(f => f.id !== id));
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      await deleteDoc(doc(db, "feedbacks", id));
      setFeedbackData(feedbackData.filter(f => f.id !== id));
    }
  };

  const handleDeleteTopic = async (id) => {
    if (window.confirm("Are you sure you want to delete this topic?")) {
      await deleteDoc(doc(db, "communityTopics", id));
      setCommunityTopics(communityTopics.filter(t => t.id !== id));
    }
  };

  const handleDeleteChatbotFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      await deleteDoc(doc(db, "chatbotFeedbacks", id));
      setChatbotFeedbacks(chatbotFeedbacks.filter(f => f.id !== id));
    }
  };

  // FILTERS
  const filterGardeners = (data) =>
    data.filter(item =>
      (item.fullName && item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.idNumber && item.idNumber.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const filterGardenForms = (data) =>
    data.filter(item =>
      (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.category && Array.isArray(item.category) &&
        item.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())))
    );

  const filterFeedbacks = (data) => {
    const term = searchTerm.toLowerCase();
    return data.filter(feedback => {
      const gardener = gardenerData.find(
        g => g.id === feedback.gardenerId || g.idNumber === feedback.gardenerId
      );
      const gardenerName = gardener ? gardener.fullName.toLowerCase() : "";
      const userName = feedback.user ? feedback.user.toLowerCase() : "";
      const comment = feedback.comment ? feedback.comment.toLowerCase() : "";

      return (
        gardenerName.includes(term) ||
        userName.includes(term) ||
        comment.includes(term)
      );
    });
  };

  const filterCommunityTopics = (data) =>
    data.filter(topic => topic.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderView = () => {
    switch (activeView) {
      case "plants":
        return <Adminplantforms />;
      case "gardeners":
        return <Admingardenform />;
      case "community":
        return <div>Chat table</div>;
      default:
        return (
          <div className={styles.HomeSection}>
            <Link to="/homepage" className={styles.closeButton}><button>x</button></Link>
            <h1>Admin Dashboard</h1>

            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchBar}
            />

            {loading ? <p>Loading...</p> : (
              <>
                {/* Gardener Table */}
                <div className={styles.TableContainer}>
                  <h2>Gardener Details</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Full Name</th>
                        <th>Preferred Location</th>
                        <th>ID Number</th>
                        <th>Filters</th>
                        <th>Custom Filter</th>
                        <th>About Me</th>
                        <th>Availability</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterGardeners(gardenerData).map((g, idx) => (
                        <tr key={idx}>
                          <td>{g.fullName || "N/A"}</td>
                          <td>{g.preferredLocation || "N/A"}</td>
                          <td>{g.idNumber || "N/A"}</td>
                          <td>{Array.isArray(g.filters) ? g.filters.join(", ") : g.filters || "N/A"}</td>
                          <td>{g.customFilter || "N/A"}</td>
                          <td>{g.aboutMe || "No details"}</td>
                          <td>{g.availability || "Not specified"}</td>
                          <td>
                            <button onClick={() => handleDeleteGardener(g.id)} className={styles.deleteBtn}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Garden Form Table */}
                <div className={styles.TableContainer}>
                  <h2>Garden Form Details</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>About</th>
                        <th>Weather</th>
                        <th>Kind</th>
                        <th>Location</th>
                        <th>Water</th>
                        <th>Placement</th>
                        <th>Nutrients</th>
                        <th>How to Plant</th>
                        <th>Category</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterGardenForms(gardenFormData).map((f, idx) => (
                        <tr key={idx}>
                          <td>{f.name || "N/A"}</td>
                          <td>{f.about || "N/A"}</td>
                          <td>{f.weather || "N/A"}</td>
                          <td>{Array.isArray(f.kind) ? f.kind.join(", ") : f.kind || "N/A"}</td>
                          <td>{f.location || "N/A"}</td>
                          <td>{f.water || "N/A"}</td>
                          <td>{f.placement || "N/A"}</td>
                          <td>{f.nutrients || "N/A"}</td>
                          <td>{Array.isArray(f.howToPlant) ? f.howToPlant.join(", ") : f.howToPlant || "N/A"}</td>
                          <td>{Array.isArray(f.category) ? f.category.join(", ") : f.category || "N/A"}</td>
                          <td>
                            <button onClick={() => handleDeleteGardenForm(f.id)} className={styles.deleteBtn}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Feedback Table */}
                <div className={styles.TableContainer}>
                  <h2>User Feedback</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Gardener Name</th>
                        <th>User Name</th>
                        <th>Comment</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterFeedbacks(feedbackData).map((f, idx) => {
                        const g = gardenerData.find(g => g.id === f.gardenerId || g.idNumber === f.gardenerId);
                        return (
                          <tr key={idx}>
                            <td>{g ? g.fullName : "Unknown"}</td>
                            <td>{f.user || "Unknown"}</td>
                            <td>{f.comment || "No comment"}</td>
                            <td>
                              <button onClick={() => handleDeleteFeedback(f.id)} className={styles.deleteBtn}>Delete</button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Community Topics Table */}
                <div className={styles.TableContainer}>
                  <h2>Community Topics</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Author ID</th>
                        <th>Created At</th>
                        <th>Comments</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterCommunityTopics(communityTopics).map((topic, idx) => (
                        <tr key={idx}>
                          <td>{topic.title}</td>
                          <td>{topic.authorId}</td>
                          <td>{topic.createdAt?.toDate ? topic.createdAt.toDate().toLocaleString() : "N/A"}</td>
                          <td>{topic.comments?.length || 0}</td>
                          <td>
                            <button onClick={() => handleDeleteTopic(topic.id)} className={styles.deleteBtn}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Chatbot Feedback Table */}
                <div className={styles.TableContainer}>
                  <h2>Chatbot Feedbacks</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>Message</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chatbotFeedbacks.length > 0 ? (
                        chatbotFeedbacks.map((feedback, idx) => (
                          <tr key={idx}>
                            <td>{feedback.userId}</td>
                            <td>{feedback.message || "No message"}</td>
                            <td>{feedback.createdAt?.toDate ? feedback.createdAt.toDate().toLocaleString() : "N/A"}</td>
                            <td>
                              <button onClick={() => handleDeleteChatbotFeedback(feedback.id)} className={styles.deleteBtn}>Delete</button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="4">No chatbot feedback found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        );
    }
  };

  return (
    <div>
      <nav className={styles.adminNav}>
        <button onClick={() => setActiveView("home")}>Home</button>
        <button onClick={() => setActiveView("plants")}>Plants</button>
        <button onClick={() => setActiveView("gardeners")}>Gardeners</button>
        <button onClick={() => setActiveView("community")}>Chat</button>
      </nav>

      <div className={styles.adminContent}>
        {renderView()}
      </div>
    </div>
  );
}

export default AdminPage;
