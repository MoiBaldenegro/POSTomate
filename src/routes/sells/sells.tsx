// styles
import "../../styles/global/global.css"
import styles from "./sells.module.css";
// Icons
import dividerIcon from "../../assets/icon/dividerBtn.svg";
import backIcon from "../../assets/icon/backIcon.svg"
import table from "../../assets/icon/table.svg";
import ticket from "../../assets/icon/ticket.svg";
import cashSignal from "../../assets/icon/cashSignal.svg";
import burgerMenu from "../../assets/icon/burgerMenu.svg";
// Hooks
import HeaderOne from "../../components/headers/headerOne/headerOne";

export default function Sells() {

    const sells = ["Restaurante", "Para llevar", "Telefonico", "Rappi"]
    return (
        <div className={styles.container}>

            <HeaderOne />
            <main className={styles.mainSectionSell}>
                {sells.map((item) => (
                    <section>
                        <h2>{item}</h2>
                        <div></div>
                    </section>
                ))}
            </main>
            <footer>
                <button><img src={backIcon} alt="back-icons" />Salir</button>
                <div>
                    <button><img src={table} alt="table-icon" />Mapa de mesas</button>
                    <img src={dividerIcon} alt="divider-icon" />
                    <button><img src={ticket} alt="ticket-icon" />Cuentas abiertas: <span>#valor</span></button>
                    <button><img src={cashSignal} alt="cash-signal" />Cuentas finalizadas <span>#valor</span></button>
                </div>
                <button><img src={burgerMenu} alt="burger-menu" />Menu</button>
            </footer>

        </div>
    )
}