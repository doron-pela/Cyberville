import { useState, useEffect } from "react";
import styles from "./ShopLayout.module.css";
import {
  BiMenu,
  BiSolidDashboard,
  BiSolidShoppingBagAlt,
  BiSolidDoughnutChart,
  BiSolidMessageDots,
  BiSolidGroup,
  BiSolidCog,
  BiPowerOff,
} from "react-icons/bi";

export default function SidebarLayout() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    function adjustSidebar() {
      if (window.innerWidth <= 576) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    }

    adjustSidebar();
    window.addEventListener("resize", adjustSidebar);

    return () => window.removeEventListener("resize", adjustSidebar);
  }, []);

  return (
    <main className={styles.container}>
      
      {/* CONTENT */}
      <section
        className={`${styles.content} ${isHidden ? styles.contentShrink : ""}`}
      ></section>
      {/* CONTENT END */}

      {/* SIDEBAR */}
      <section className={`${styles.sidebar} ${isHidden ? styles.hide : ""}`}>

        <BiMenu
          size={22}
          onClick={() => setIsHidden((prev) => !prev)}
          className={styles.menuIcon}
        />

        <div className={styles.menuFlex}>

          <ul className={`${styles.sideMenu} ${styles.top}`}>
            <li className={styles.active}>
              <a href="#">
                <BiSolidDashboard size={20} />
                <span className={styles.text}>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#">
                <BiSolidShoppingBagAlt size={20} />
                <span className={styles.text}>My Store</span>
              </a>
            </li>
            <li>
              <a href="#">
                <BiSolidDoughnutChart size={20} />
                <span className={styles.text}>Analytics</span>
              </a>
            </li>
            <li>
              <a href="#">
                <BiSolidMessageDots size={20} />
                <span className={styles.text}>Message</span>
              </a>
            </li>
            <li>
              <a href="#">
                <BiSolidGroup size={20} />
                <span className={styles.text}>Team</span>
              </a>
            </li>
          </ul>
        
          <ul className={`${styles.sideMenu} ${styles.bottom}`}>
            <li>
              <a href="#">
                <BiSolidCog size={20} className={styles.spinHover} />
                <span className={styles.text}>Settings</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.logout}>
                <BiPowerOff size={20} className={styles.burstHover} />
                <span className={styles.text}>Logout</span>
              </a>
            </li>
          </ul>

        </div>
        
      </section>

      {/* SIDEBAR END */}
    </main>
  );
}
