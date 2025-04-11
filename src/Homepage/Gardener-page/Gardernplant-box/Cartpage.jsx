// components/CartSidebar.jsx
import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import styles from './Gardenplant.module.css';  
import { gardenItems } from '../Gardernplant-box/data/items';

const CartSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  // Filter by category
  const plantingItems = gardenItems.filter(item => item.category === 'planting');
  const gardenerItems = gardenItems.filter(item => item.category === 'gardener');

  return (
    <div className={styles.mainContainer}>
      <button className={styles.cartToggleBtn} onClick={toggleDrawer}>
        🛒 Cart
      </button>

      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className={styles.cartDrawer}
      >
        <div className={styles.cartContent}>
          <h2>Your Cart</h2>

          {/* Planting Side */}
          <div>
            <h3>🌱 Planting Side</h3>
            {plantingItems.length > 0 ? (
              <ul>
                {plantingItems.map((item) => (
                  <li key={item.id} style={{ marginBottom: "1rem" }}>
                    <strong>{item.title}</strong>
                    <p>{item.price ? `Price: ${item.price}` : "No price available"}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No planting items.</p>
            )}
          </div>

          {/* Gardener Side */}
          <div style={{ marginTop: '2rem' }}>
            <h3>👨‍🌾 Gardener Side</h3>
            {gardenerItems.length > 0 ? (
              <ul>
                {gardenerItems.map((item) => (
                  <li key={item.id} style={{ marginBottom: "1rem" }}>
                    <strong>{item.title}</strong>
                    <p>{item.price ? `Price: ${item.price}` : "No price available"}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No gardener items.</p>
            )}
          </div>

          <button onClick={toggleDrawer}>x</button>
        </div>
      </Drawer>
    </div>
  );
};

export default CartSidebar;
