// styles
import "../../styles/global/global.css";
import styles from "./sells.module.css";
// Icons
import dividerIcon from "../../assets/icon/dividerBtn.svg";
import backIcon from "../../assets/icon/backIcon.svg";
import table from "../../assets/icon/table.svg";
import ticket from "../../assets/icon/ticket.svg";
import cashSignal from "../../assets/icon/cashSignal.svg";
import burgerMenu from "../../assets/icon/burgerMenu.svg";
// Hooks
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
//Dependencies
import { useNavigate } from "react-router-dom";
import { useCurrentCommand } from "../../store/productsInOrder.store";
import { SellType } from "../../types/props/sellType";
import { useModal } from "../../hooks/useModal";
import MainMenu from "../../components/menus/mainMenu/mainMenu";

export default function Sells() {
  const navigate = useNavigate();
  const billCurrentCommand = useCurrentCommand(
    (state) => state.BillCommandCurrent
  );
  const setBillCurrentCommand = useCurrentCommand((state) => state.setState);
  const handleclick = (item: SellType) => {
    setBillCurrentCommand({ ...billCurrentCommand, sellType: item.sellType });
    navigate("/tables");
  };

  const mainMenu = useModal("mainMenu");

  const sells: SellType[] = [
    { name: "Restaurant", sellType: "onSite" },
    { name: "Para llevar", sellType: "toGo" },
    { name: "Telefonico", sellType: "phone" },
    { name: "Rappi", sellType: "rappi" },
  ];
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <main className={styles.mainSectionSell}>
        {sells.map((item) => (
          <section
            onClick={() => {
              handleclick(item);
            }}
          >
            <h2>{item.name}</h2>
            <div></div>
          </section>
        ))}
      </main>
      <footer>
        <button
          onClick={() => {
            navigate("/login");
            console.log("ejecucion");
          }}
        >
          <img src={backIcon} alt="back-icons" />
          Salir
        </button>
        <div>
          <button>
            <img src={table} alt="table-icon" />
            Mapa de mesas
          </button>
          <img src={dividerIcon} alt="divider-icon" />
          <button>
            <img src={ticket} alt="ticket-icon" />
            Cuentas abiertas: <span>#valor</span>
          </button>
          <button>
            <img src={cashSignal} alt="cash-signal" />
            Cuentas finalizadas <span>#valor</span>
          </button>
        </div>
        <button onClick={mainMenu.openModal}>
          <img src={burgerMenu} alt="burger-menu" />
          Menu
        </button>
      </footer>
      {mainMenu.isOpen && mainMenu.modalName === "mainMenu" ? (
        <MainMenu onClose={mainMenu.closeModal} isOpen={mainMenu.isOpen}>
          Main Menu
        </MainMenu>
      ) : null}
    </div>
  );
}
