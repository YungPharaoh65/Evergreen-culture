// components/CartSidebar.jsx
import React, { useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import styles from './Gardenplant.module.css';  
import { gardenItems } from '../Gardernplant-box/data/items';

const CartSidebar = () => {``
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
          <h2>my orders </h2>

{/**small border info */}{/**small border info */}{/**small border info */}
          <div className={styles.borderbox}>
            

             <div className={styles.smallborder}>
              <p>List:</p>
              <p>List:</p>
              <p>List:</p>
              </div>

            <br /> 
            <button className={styles.cartbtn}>quantity/s: 10</button>
            <button className={styles.cartbtn}>order on</button>
            </div>
{/**small border info */}{/**small border info */}{/**small border info */}

<br /><br />

{/**small border info */}{/**small border info */}{/**small border info */}
<div className={styles.borderbox}>

              <div className={styles.smallborder}>
              <p>Name: (request/date/time wanted)</p>
                </div>
              
            <br /> 
             <button className={styles.cartbtn}>Amount: R900</button>
             <button className={styles.cartbtn}>Hire proff.</button>
            
             </div>
{/**small border info */}{/**small border info */}{/**small border info */}

<button className={styles.cartbtn2}>take orders</button>
<br />
            </div>
      </Drawer>
    </div>
  );
};

export default CartSidebar;
