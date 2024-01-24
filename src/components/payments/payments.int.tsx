import printJS from "print-js";
import styles from "./payment.int.module.css";
// Icons
import cashCircle from "../../assets/icon/cashCircle.svg";
import closeIcon from "../../assets/icon/closeIcon.svg";
import ActionsIcon from "../../assets/icon/actionsIcon.svg";
import cashIcon from "../../assets/icon/cashIcon.svg";
import cardIcon from "../../assets/icon/cardIcon.svg";
import transferIcon from "../../assets/icon/transferIcon.svg";
import checkLarge from "../../assets/icon/checkLarge.svg";
import backLarge from "../../assets/icon/backLarge.svg";
import blueDivider from "../../assets/icon/blueDivider.svg";
import cashIconMedium from "../../assets/icon/cashSignalMedium.svg";
// Hooks
import useDate from "../../hooks/useDate";
import { useRef } from "react";
// Utils
import { denominations, keyboard } from "./utils/denominations";
import TicketComponent from "../tickets/ventas/mainTicket/mainTicket";
import PrintButton from "../buttons/printerButton/printButton";
interface Props {
  openModal: any;
  isOpen: any;
  onClose: any;
  children: any;
}

export default function PaymentInterface({
  openModal,
  isOpen,
  onClose,
  children,
}: Props) {
  // Date
  const { currentDateTime, opcionesFecha }: any = useDate();
  const formattedFecha = currentDateTime.toLocaleDateString(
    "es-ES",
    opcionesFecha
  );
  const ticketRef = useRef(null);

  // Llamar a Print.js para imprimir el contenido
  const handleImprimirTicket = () => {
    if (ticketRef.current) {
      printJS({
        printable: ticketRef.current,
        type: "html",
        targetStyles: ["*"],
      });
    }
  };

  return (
    <div className={styles.screen}>
      <section className={styles.modal}>
        <div>
          <div>
            <img src={cashCircle} alt="cash-circle" />
            <h1>{children}</h1>
          </div>
          <span>{formattedFecha}</span>
          <button className={styles.closeButton} onClick={onClose}>
            <img src={closeIcon} alt="close-icon" />
          </button>
        </div>
        <div ref={ticketRef} className={styles.ticket}>
          <TicketComponent />

          <div>
            <h3>Total: $00.00</h3>
            <button className={styles.actionBtn}>
              <img src={ActionsIcon} alt="burguer-menu" />
            </button>
          </div>
        </div>
        <div>
          <div>
            <div className={styles.totalContainer}>
              <h2>$0.00</h2>
            </div>
            <div>
              <button className={styles.keyboardBtn}>
                <img src={cashIcon} alt="cash-icon" />
                Efectivo
              </button>
              <button className={styles.keyboardBtn}>
                <img src={cardIcon} alt="card-icon" />
                Débito
              </button>
              <button className={styles.keyboardBtn}>
                <img src={cardIcon} alt="card-icon" />
                Crédito
              </button>
              <button className={styles.keyboardBtn}>
                <img src={transferIcon} alt="spei-icon" />
                Transferencia
              </button>
            </div>
            <div>
              <div>
                {keyboard?.map((item) => (
                  <button className={styles.keyboardItems}>{item}</button>
                ))}
              </div>
              <div className={styles.denominationsContainer}>
                {denominations?.map((item) => (
                  <button className={styles.denominationBtn}>${item}</button>
                ))}
                <button className={styles.denominationBtn}>
                  <img src={checkLarge} alt="check-large-icon" />
                </button>
                <button className={styles.denominationBtn}>
                  <img src={backLarge} alt="back-large-icon" />
                </button>
              </div>
            </div>
            {/*  <button className={styles.ticket} onClick={handleImprimirTicket}>
              Imprimir Ticket
            </button>    */}
          </div>
          <div>
            <div>
              <div>
                <h4>Forma de pago</h4>
                <h4>Importe</h4>
              </div>

              <img src={blueDivider} alt="divider-blue-icon" />
              <div className={styles.addPayContainer}></div>
              <img src={blueDivider} alt="divider-blue-icon" />
              <div className={styles.payTotal}>
                <h4>Diferencia</h4>
                <h4>$0.00</h4>
              </div>
            </div>
            <PrintButton />
          </div>
        </div>
      </section>
    </div>
  );
}
