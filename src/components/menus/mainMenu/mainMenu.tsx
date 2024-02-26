import styles from "./mainMenu.module.css";
import closeIcon from "../../../assets/icon/closeButton.svg";
import burgerMenu from "../../../assets/icon/burgerColorIcon.svg";
import menuOne from "../../../assets/icon/menuIconOne.svg";
import menuTwo from "../../../assets/icon/menuIconTwo.svg";
import menuThree from "../../../assets/icon/menuIconThree.svg";
import menuFour from "../../../assets/icon/menuIconFour.svg";
import menuFive from "../../../assets/icon/menuIconFive.svg";
import menuSix from "../../../assets/icon/menuIconSix.svg";
import menuSeven from "../../../assets/icon/menuIconSeven.svg";
import menuEight from "../../../assets/icon/menuIconEight.svg";
import menuNine from "../../../assets/icon/menuIconNine.svg";
import menuTen from "../../../assets/icon/menuIconTen.svg";
import { useNavigate } from "react-router-dom";
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}
export default function MainMenu({ isOpen, onClose, children }: Props) {
  const navigate = useNavigate();
  return (
    <div className={styles.screen}>
      <section className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={closeIcon} alt="close-icon" />
        </button>
        <section>
          <img src={burgerMenu} alt="burger-menu" />
          <h2>Menú</h2>
        </section>
        <section>
          <button>
            <img src={menuOne} alt="menu-icon" />
            <span>Movimientos de caja</span>
          </button>
          <button>
            <img src={menuTwo} alt="menu-icon" />
            <span>Corte X</span>
          </button>
          <button>
            <img src={menuTwo} alt="menu-icon" />
            <span>Corte de caja</span>
          </button>
          <button>
            <img src={menuThree} alt="menu-icon" />
            <span>Control de mesas</span>
          </button>
          <button>
            <img src={menuFour} alt="menu-icon" />
            <span>Desactivar Productos</span>
          </button>
          <button>
            <img src={menuFive} alt="menu-icon" />
            <span>Comedor de empleados</span>
          </button>
          <button
            onClick={() => {
              navigate("/biometrics");
            }}
          >
            <img src={menuSix} alt="menu-icon" />
            <span>Registro de huellas</span>
          </button>
          <button>
            <img src={menuSeven} alt="menu-icon" />
            <span>Clientes</span>
          </button>
          <button>
            <img src={menuEight} alt="menu-icon" />
            <span>Reservaciones</span>
          </button>
          <button
            onClick={() => {
              navigate("/reports");
            }}
          >
            <img src={menuNine} alt="menu-icon" />
            <span>Reportes</span>
          </button>
          <button>
            <img src={menuTen} alt="menu-icon" />
            <span>Cierre manual</span>
          </button>
        </section>
      </section>
    </div>
  );
}
