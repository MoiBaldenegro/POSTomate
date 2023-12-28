//styles 
import "../../styles/global/global.css";
import styles from "./restaurant.module.css";
// Icons
import logo from "../../assets/icon/logo.svg";
import logoDivider from "../../assets/icon/logoDivider.svg";
import bulletIcon from "../../assets/icon/bullet.svg";
import dividerIcon from "../../assets/icon/dividerBtn.svg";
import useDate from "../../hooks/useDate";
import signal from "../../assets/icon/signal.svg";
import filas from "../../assets/icon/Filas.svg";


export default function Restaurant() {
    // Date
    const { currentDateTime, opcionesFecha, opcionesHora }: any = useDate();
    const formattedFecha = currentDateTime.toLocaleDateString('es-ES', opcionesFecha);
    const formattedHora = currentDateTime.toLocaleTimeString('es-ES', opcionesHora);
    return (
        <div>
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
            <img src={filas} alt="" />
        </div>
    )
}