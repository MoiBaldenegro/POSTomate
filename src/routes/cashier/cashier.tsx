// Styles
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import "../../styles/global/global.css";
import styles from "./cashier.module.css";

// Icons
import enableIcon from "../../assets/icon/enableIcon.svg";
import paymentIcon from "../../assets/icon/paymentIcon.svg";
import logOutIcon from "../../assets/icon/logOutIcon.svg";
import homeIcon from "../../assets/icon/homeIcon.svg";
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
import { useAuthStore } from "../../store/auth/auth.store";
import { useNavigate } from "react-router-dom";
import { EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL } from "../../lib/modals.lib";
import ExceptionMessages from "../../components/modals/exceptionMessages/exceptionMessages";
import UseCashierException from "../../hooks/exceptions/useCashierException";

export default function Cashier() {
  //exceptions
  const cashierSessionException = useModal(
    EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL
  );

  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  const navigate = useNavigate();

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
  UseCashierException(cashierSessionException.openModal);

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
        {cashierSessionException.isOpen &&
        cashierSessionException.modalName ===
          EXCEPTION_MESSAGES_CASHIER_SESSION_MODAL ? (
          <ExceptionMessages
            interactive={true}
            isOpen={cashierSessionException.isOpen}
            onClose={cashierSessionException.closeModal}
          >
            No hay cajas abiertas
          </ExceptionMessages>
        ) : null}
      </main>
      <footer className={styles.footer}>
        <div>
          <button
            onClick={() => {
              logOutRequest();
            }}
          >
            <img src={logOutIcon} alt="back-icon" />
            Salir
          </button>
          <button
            onClick={() => {
              navigate("/sell-types");
            }}
          >
            <img src={homeIcon} alt="home-icon" />
            Inicio
          </button>
        </div>
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
8;
