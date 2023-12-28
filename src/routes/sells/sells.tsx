// styles
import "../../styles/global/global.css"
import styles from "./sells.module.css";
// Icons
import logo from "../../assets/icon/logo.svg";
import logoDivider from "../../assets/icon/logoDivider.svg";
import bulletIcon from "../../assets/icon/bullet.svg";
import dividerIcon from "../../assets/icon/dividerBtn.svg";
import signal from "../../assets/icon/signal.svg";
import backIcon from "../../assets/icon/backIcon.svg"
import table from "../../assets/icon/table.svg";
import ticket from "../../assets/icon/ticket.svg";
import cashSignal from "../../assets/icon/cashSignal.svg";
import burgerMenu from "../../assets/icon/burgerMenu.svg";
// Hooks
import useDate from "../../hooks/useDate";

export default function Sells() {
    // Date
    const { currentDateTime, opcionesFecha, opcionesHora }: any = useDate();
    const formattedFecha = currentDateTime.toLocaleDateString('es-ES', opcionesFecha);
    const formattedHora = currentDateTime.toLocaleTimeString('es-ES', opcionesHora);
    const sells = ["Restaurante", "Para llevar", "Telefonico", "Rappi"]
    return (
        <div className={styles.container}>
            <header>
                <div>
                    <img src={logo} alt="logo" />
                    <img src={logoDivider} alt="logo-divider" />
                    <h3>PUNTO DE VENTA</h3>
                </div>
                <div>
                    <h3>1038</h3>
                    <h3>Moises B.</h3>
                    <img src={bulletIcon} alt="bullet-icon" />
                    <h3>Develop</h3>
                    <img src={dividerIcon} alt="divider-icon" />
                    <p>{formattedFecha}</p>
                    <img src={dividerIcon} alt="divider-icon" />
                    <p>{formattedHora}</p>
                    <img src={dividerIcon} alt="divider-icon" />
                    <img src={signal} alt="signal-icon" />
                </div>
            </header>
            <main>
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