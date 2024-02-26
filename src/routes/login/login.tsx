// Styles
import styles from "./login.module.css";
import "../../styles/global/global.css";
// Hooks
// Icons
import posLogo from "../../assets/icon/tomatePOSlogo.svg";
import fingerprintIco from "../../assets/icon/fingerprint.svg";
import startShift from "../../assets/icon/startShift.svg";
import dividerBtn from "../../assets/icon/dividerBtn.svg";
import foodShift from "../../assets/icon/foodShift.svg";
import bullet from "../../assets/icon/bullet.svg";
import point from "../../assets/icon/point.svg";
// Components
import Pinboard from "../../components/tools/keyboard/Pinboard";
import HeaderOne from "../../components/headers/headerOne/headerOne";
// Dependencies
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const elements = [".", ".", ".", ".", ".", "."];

  useEffect(() => {}, []);
  return (
    <div className={styles.container}>
      <HeaderOne />
      <main className={styles.mainSection}>
        <section className={styles.sectionOne}>
          <h2>Bienvenido</h2>
          <img src={posLogo} alt="pos-logo" />
        </section>
        <section className={styles.sectionTwo}>
          <h4>ingresar código</h4>
          <div className={styles.nums}>
            {elements.map((_item) => (
              <img src={point} alt="point" />
            ))}
          </div>
          <Pinboard />
        </section>
      </main>
      <footer className={styles.footer}>
        <div>
          <button>
            <img src={fingerprintIco} alt="fingerprint-icon" />
          </button>
          <img src={dividerBtn} alt="divider-icon" />
          <button>
            <img src={startShift} alt="start-shift-icon" />
          </button>
          <button>
            <img src={foodShift} alt="food-shift" />
          </button>
        </div>
        <div>
          <h3>POS</h3>
          <img src={bullet} alt="bullet-icon" />
          <h3>LOC Terraza</h3>
          <img src={bullet} alt="bullet-icon" />
          <h3>v-Develop</h3>
        </div>
      </footer>
    </div>
  );
}
