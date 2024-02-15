// Styles
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import "../../styles/global/global.css";
import styles from "./cashier.module.css";

// Icons
import enableIcon from "../../assets/icon/enableIcon.svg";
import paymentIcon from "../../assets/icon/paymentIcon.svg";
// Hooks
import { useModal } from "../../hooks/useModal";
import UseAccount from "../../hooks/useAccount";
// Types and interfaces
import PaymentInterface from "../../components/payments/payments.int";
// Components
import CashierBox from "../../components/cashierBox/cashierBox";
import { useEffect, useState } from "react";
import { Bill } from "../../types/account";
import ConfirmPayment from "../../components/modals/confirmPayments/confirmPayments";

export default function Cashier() {
  const paymentInterface = useModal("paymentInterface");
  const confirmPayment = useModal("confirmPayment");
  const { accountArray, getBills } = UseAccount();
  const [currentBill, setCurrentBill] = useState<Bill>();

  /////////////////////////////
  // Manejo de errores en el pago
  const [errors, setErros] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [revolve, setRevolve] = useState<string>("");

  //////////////////////////

  useEffect(() => {
    getBills();
  }, []);
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <main className={styles.mainSection}>
        {accountArray?.map((item) =>
          item.status === "forPayment" ? (
            <div>
              <CashierBox
                setting={setCurrentBill}
                openModal={paymentInterface.openModal}
                item={item}
                route={"/"}
              />
            </div>
          ) : (
            ""
          )
        )}
        {paymentInterface.isOpen &&
        paymentInterface.modalName === "paymentInterface" ? (
          <PaymentInterface
            setRevolve={setRevolve}
            handleLoading={setIsloading}
            currentBill={currentBill}
            openModal={confirmPayment.openModal}
            isOpen={paymentInterface.isOpen}
            onClose={paymentInterface.closeModal}
          >
            Cobrar
          </PaymentInterface>
        ) : null}
        {confirmPayment.isOpen &&
        confirmPayment.modalName === "confirmPayment" ? (
          <ConfirmPayment
            setIsLoading={setIsloading}
            revolve={revolve}
            isLoading={isLoading}
            isOpen={confirmPayment.isOpen}
            onClose={confirmPayment.closeModal}
          >
            {revolve}
          </ConfirmPayment>
        ) : null}
      </main>
      <footer className={styles.footer}>
        <div>
          <span>
            <img src={enableIcon} alt="enable-icon" />
            Activa
          </span>
          <span>
            <img src={paymentIcon} alt="payment-icon" />
            Por pagar
          </span>
        </div>
      </footer>
    </div>
  );
}
