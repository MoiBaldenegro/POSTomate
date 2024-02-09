// styles
import HeaderOne from "../../components/headers/headerOne/headerOne";
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import styles from "./fingerRegister.module.css";
// icons
import homeButtonIcon from "./../../assets/icon/homeButtonIcon.svg";
import registerFingerIcon from "./../../assets/icon/RegisterFingerIcon.svg";

export default function FingerRegister() {
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <main>
        <section>
          <div>
            <img src={registerFingerIcon} alt="register-finger-icon" />
            <h2>Registro de huellas</h2>
          </div>
          <div></div>
        </section>
        <section></section>
      </main>
      <footer>
        <button>
          <img src={homeButtonIcon} alt="home-icon" />
          Inicio
        </button>
      </footer>
    </div>
  );
}
