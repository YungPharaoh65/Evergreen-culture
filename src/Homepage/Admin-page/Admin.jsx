import Adminforms from "../../Forms/Adminplantforms";
import Admingardenform from "../../Forms/Admingardenform";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "../../Firebasedata/firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import styles from "./Admin.module.css";

function AdminPage() {
  const [activeView, setActiveView] = useState("home");
  const [gardenerData, setGardenerData] = useState([]);
  const [gardenFormData, setGardenFormData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [communityTopics, setCommunityTopics] = useState([]);  // NEW STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch gardeners collection
  const fetchGardenerData = async () => {
    try {
      const gardenerRef = collection(db, "gardeners");
      const snapshot = await getDocs(gardenerRef);
      setGardenerData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching gardener data:", error);
    }
  };

  // Fetch gardenForms collection
  const fetchGardenFormData = async () => {
    try {
      const gardenFormRef = collection(db, "gardenForms");
      const snapshot = await getDocs(gardenFormRef);
      setGardenFormData(snapshot.docs.map(doc => doc.data()));
    } catch (error) {
      console.error("Error fetching garden form data:", error);
    }
  };

  // Fetch feedbacks collection
  const fetchFeedbackData = async () => {
    try {
      const feedbackRef = collection(db, "feedbacks");
      const snapshot = await getDocs(feedbackRef);
      setFeedbackData(snapshot.docs.map(doc => doc.data()));
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  // Listen for communityTopics realtime updates
  useEffect(() => {
    const unsubscribeCommunity = onSnapshot(collection(db, "communityTopics"), (snapshot) => {
      const topicsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCommunityTopics(topicsData);
    }, (error) => {
      console.error("Error fetching community topics:", error);
    });

    return () => unsubscribeCommunity();
  }, []);

  useEffect(() => {
    fetchGardenerData();
    fetchGardenFormData();
    fetchFeedbackData();
  }, []);

  useEffect(() => {
    if (gardenerData.length && gardenFormData.length && feedbackData.length && communityTopics.length >= 0) {
      setLoading(false);
    }
  }, [gardenerData, gardenFormData, feedbackData, communityTopics]);

  // Filters (same as your previous code)...

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
        return <Adminforms />;
      case "gardeners":
        return <Admingardenform />;
      case "community": // NEW CASE for community page
        return (
          <div>
            <h1>Community Topics</h1>
            <input
              type="text"
              placeholder="Search topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchBar}
            />
            <div className={styles.TableContainer} style={{overflowX: "auto"}}>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author ID</th>
                    <th>Created At</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {filterCommunityTopics(communityTopics).length > 0 ? (
                    filterCommunityTopics(communityTopics).map((topic, idx) => (
                      <tr key={idx}>
                        <td>{topic.title}</td>
                        <td>{topic.authorId || "N/A"}</td>
                        <td>{topic.createdAt?.toDate ? topic.createdAt.toDate().toLocaleString() : "N/A"}</td>
                        <td>
                          {topic.comments.length === 0 ? (
                            "No comments"
                          ) : (
                            <ul style={{ paddingLeft: "1rem", margin: 0 }}>
                              {topic.comments.map((cmt, i) => (
                                <li key={i}>
                                  <b>{cmt.email}:</b> {cmt.text}
                                </li>
                              ))}
                            </ul>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4">No community topics found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.HomeSection}>
            <Link to="/homepage" className={styles.closeButton}><button>x</button></Link>
            <h1>Admin Dashboard</h1>

            <input
              type="text"
              placeholder="Search by name, ID, category, or comment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchBar}
            />
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {/* Gardener Details Table */}
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
                      </tr>
                    </thead>
                    <tbody>
                      {filterGardeners(gardenerData).length > 0 ? (
                        filterGardeners(gardenerData).map((gardener, index) => (
                          <tr key={index}>
                            <td>{gardener.fullName || "N/A"}</td>
                            <td>{gardener.preferredLocation || "N/A"}</td>
                            <td>{gardener.idNumber || "N/A"}</td>
                            <td>{gardener.filters ? gardener.filters.join(", ") : "N/A"}</td>
                            <td>{gardener.customFilter || "N/A"}</td>
                            <td>{gardener.aboutMe || "No details available"}</td>
                            <td>{gardener.availability || "Not specified"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="7">No matching gardener data found.</td></tr>
                      )}
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
                      </tr>
                    </thead>
                    <tbody>
                      {filterGardenForms(gardenFormData).length > 0 ? (
                        filterGardenForms(gardenFormData).map((form, index) => (
                          <tr key={index}>
                            <td>{form.name || "N/A"}</td>
                            <td>{form.about || "N/A"}</td>
                            <td>{form.weather || "N/A"}</td>
                            <td>{form.kind ? form.kind.join(", ") : "N/A"}</td>
                            <td>{form.location || "N/A"}</td>
                            <td>{form.water || "N/A"}</td>
                            <td>{form.placement || "N/A"}</td>
                            <td>{form.nutrients || "N/A"}</td>
                            <td>{form.howToPlant || "N/A"}</td>
                            <td>{form.category ? form.category.join(", ") : "N/A"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="10">No matching garden form data found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Feedback Table */}
                <div className={styles.TableContainer}>
                  <h2>Feedback Comments</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Gardener Name</th>
                        <th>User Name</th>
                        <th>Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterFeedbacks(feedbackData).length > 0 ? (
                        filterFeedbacks(feedbackData).map((feedback, index) => {
                          const gardener = gardenerData.find(
                            g => g.id === feedback.gardenerId || g.idNumber === feedback.gardenerId
                          );
                          return (
                            <tr key={index}>
                              <td>{gardener ? gardener.fullName : "Unknown Gardener"}</td>
                              <td>{feedback.user || "Anonymous"}</td>
                              <td>{feedback.comment || "No comment provided"}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr><td colSpan="3">No feedback data found matching your search.</td></tr>
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
    <div className={styles.AdminContainer}>
      <div className={styles.ToggleBar}>
        <button
          className={activeView === "home" ? styles.Active : ""}
          onClick={() => setActiveView("home")}
        >
          Dashboard
        </button>
        <button
          className={activeView === "plants" ? styles.Active : ""}
          onClick={() => setActiveView("plants")}
        >
          Plant Form
        </button>
        <button
          className={activeView === "gardeners" ? styles.Active : ""}
          onClick={() => setActiveView("gardeners")}
        >
          Gardener Form
        </button>
        <button
          className={activeView === "community" ? styles.Active : ""}
          onClick={() => setActiveView("community")}
        >
          Community Page
        </button>
      </div>
      <div className={styles.ViewSection}>{renderView()}</div>
      <br />
      <br />
    </div>
  );
}

export default AdminPage;
