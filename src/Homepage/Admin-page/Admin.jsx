import Adminforms from "../../Forms/Adminplantforms";
import Admingardenform from "../../Forms/Admingardenform";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { db } from "../../Firebasedata/firebase";
import { getDocs, collection } from "firebase/firestore";
import styles from "./Admin.module.css";

function AdminPage() {
  const [activeView, setActiveView] = useState("home");
  const [gardenerData, setGardenerData] = useState([]);
  const [gardenFormData, setGardenFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchGardenerData = async () => {
    try {
      const gardenerRef = collection(db, "gardeners");
      const gardenerSnapshot = await getDocs(gardenerRef);

      if (!gardenerSnapshot.empty) {
        const gardenerList = gardenerSnapshot.docs.map(doc => doc.data());
        setGardenerData(gardenerList);
      } else {
        console.log("No gardener data found.");
        setGardenerData([]);
      }
    } catch (error) {
      console.error("Error fetching gardener data:", error);
      setGardenerData([]);
    }
  };

  const fetchGardenFormData = async () => {
    try {
      const gardenFormRef = collection(db, "gardenForms");
      const gardenFormSnapshot = await getDocs(gardenFormRef);

      if (!gardenFormSnapshot.empty) {
        const gardenFormList = gardenFormSnapshot.docs.map(doc => doc.data());
        setGardenFormData(gardenFormList);
      } else {
        console.log("No garden form data found.");
        setGardenFormData([]);
      }
    } catch (error) {
      console.error("Error fetching garden form data:", error);
      setGardenFormData([]);
    }
  };

  useEffect(() => {
    fetchGardenerData();
    fetchGardenFormData();
  }, []);

  useEffect(() => {
    if (gardenerData.length && gardenFormData.length) {
      setLoading(false);
    }
  }, [gardenerData, gardenFormData]);

  // Search filter functions
  const filterGardeners = (data) => {
    return data.filter(item => {
      const nameMatch = item.fullName && item.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      const idMatch = item.idNumber && item.idNumber.toString().toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch || idMatch;
    });
  };

  const filterGardenForms = (data) => {
    return data.filter(item => {
      const nameMatch = item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch =
        item.category &&
        Array.isArray(item.category) &&
        item.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
      return nameMatch || categoryMatch;
    });
  };

  const renderView = () => {
    switch (activeView) {
      case "plants":
        return <Adminforms />;
      case "gardeners":
        return <Admingardenform />;
      default:
        return (
          <div className={styles.HomeSection}>
            <h1>Admin Dashboard</h1>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search by name, ID, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchBar}
            />

            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
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
                        <tr>
                          <td colSpan="7">No matching gardener data found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

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
                        filterGardenForms(gardenFormData).map((gardenForm, index) => (
                          <tr key={index}>
                            <td>{gardenForm.name || "N/A"}</td>
                            <td>{gardenForm.about || "No details available"}</td>
                            <td>{gardenForm.weather || "N/A"}</td>
                            <td>{gardenForm.kind ? gardenForm.kind.join(", ") : "N/A"}</td>
                            <td>{gardenForm.location || "N/A"}</td>
                            <td>{gardenForm.water || "N/A"}</td>
                            <td>{gardenForm.placement || "N/A"}</td>
                            <td>{gardenForm.nutrients || "N/A"}</td>
                            <td>{gardenForm.howToPlant || "N/A"}</td>
                            <td>{gardenForm.category ? gardenForm.category.join(", ") : "N/A"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="10">No matching garden form data found.</td>
                        </tr>
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
      </div>

      <div className={styles.ViewSection}>
        {renderView()}
      </div>

      <Link to="/" className={styles.closeButton}>
        <button>x</button>
      </Link>
    </div>
  );
}

export default AdminPage;
