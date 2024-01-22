// Styles
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import "../../styles/global/global.css";
import styles from "../toGoOrder/toGoOrder.module.css";
// Icons
import enableIcon from "../../assets/icon/enableIcon.svg"
import paymentIcon from "../../assets/icon/paymentIcon.svg"
import freeIcon from "../../assets/icon/freeIcon.svg";
import addIcon from "../../assets/icon/addIcon.svg";
import homeIcon from "../../assets/icon/homeIcon.svg";

export default function ToGoOrder() {
    return (
        <div className={styles.container}>
            <HeaderTwo />
            <main className={styles.mainSection}>

            </main>
            <footer className={styles.footer}>
                <div>
                    <span><img src={enableIcon} alt="enable-icon" />Activa</span>
                    <span><img src={paymentIcon} alt="payment-icon" />Por pagar</span>
                    <span><img src={freeIcon} alt="free-icon" />Libre</span>
                </div>
                <button><img src={addIcon} alt="add-icon" />Nueva cuenta</button>
                <button><img src={homeIcon} alt="home-icon" />Inicio</button>
            </footer>
        </div>
    )
}