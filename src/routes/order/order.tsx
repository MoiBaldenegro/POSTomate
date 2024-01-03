// styles 
import "../../styles/global/global.css";
import styles from "./order.module.css";
// Icons
import backIcon from "../../assets/icon/backArrow.svg";
import sendIcon from "../../assets/icon/sendIcon.svg";
import dividerBtn from "../../assets/icon/dividerBtn.svg"
import separateIcon from "../../assets/icon/separateNotes.svg";
import actionsIcon from "../../assets/icon/actionsIcon.svg";
import printIcon from "../../assets/icon/printIcon.svg";
import tillIcon from "../../assets/icon/tillIcon.svg";
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";

export default function Order() {
    return (
        <div className={styles.container}>
            <HeaderTwo />
            <main className={styles.mainSection}>
                <section>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        <button>m</button>
                        <button>m</button>
                        <button>m</button>
                        <button>m</button>
                        <button>m</button>
                        <button>m</button>
                        <button>m</button>
                        <button>m</button>
                        <button>m</button>
                        <button>m</button>
                        <button>m</button>
                        <button>m</button>
                    </div>
                </section>
                <section></section>

            </main>
            <footer className={styles.footer}>
                <button><img src={backIcon} alt="back-icon" />Atrás</button>
                <div>
                    <button><img src={separateIcon} alt="separate-icon" />Separar notas</button>
                    <button><img src={actionsIcon} alt="action-icon" />Mas acciones</button>
                    <img src={dividerBtn} alt="divider-buttons" />
                    <button><img src={printIcon} alt="print-icon" />Imprimir</button>
                    <button><img src={tillIcon} alt="till-icon" />Cobrar</button>
                </div>
                <button><img src={sendIcon} alt="send-icon" />Enviar</button>
            </footer>
        </div>
    )
}