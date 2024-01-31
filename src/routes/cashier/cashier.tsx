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

export default function Cashier() {
  const paymentInterface = useModal("paymentInterface");
  const { accountArray, getBills } = UseAccount();
  const [currentBill, setCurrentBill] = useState<Bill>();

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
            currentBill={currentBill}
            openModal={paymentInterface.openModal}
            isOpen={paymentInterface.isOpen}
            onClose={paymentInterface.closeModal}
          >
            Cobrar
          </PaymentInterface>
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
