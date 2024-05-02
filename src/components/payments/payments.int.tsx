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
import deleteIcon from "../../assets/icon/deleteIcon.svg";
// Hooks
import useDate from "../../hooks/useDate";
// Utils
import { denominations, keyboard } from "./utils/denominations";
import PrintButton from "../buttons/printerButton/printButton";
import { Bill } from "../../types/account";
import { ChangeEvent, useEffect, useState } from "react";
// types
import { Payment, Transaction } from "../../types/payment";
import { initialState, initialTransaction } from "./utils/initialState";
interface Props {
  setRevolve: (value: string) => void;
  handleLoading: (value: boolean) => void;
  openModal: any;
  isOpen: any;
  onClose: any;
  children: any;
  currentBill: any; // aca hay que extender el modelo con "._id" y lo que haga falta
}

export default function PaymentInterface({
  setRevolve,
  handleLoading,
  openModal,
  isOpen,
  onClose,
  children,
  currentBill,
}: Props) {
  // Date
  const { currentDateTime, opcionesFecha }: any = useDate();
  const formattedFecha = currentDateTime.toLocaleDateString(
    "es-ES",
    opcionesFecha
  );
  const [paymentType, setPaymentType] = useState("cash");
  const [createPayment, setCreatePayment] = useState<Payment>(initialState);
  const [paymentQuantity, setPaymentQuantity] = useState<string>("0.00");
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction>(initialTransaction);

  const handleChange = (value: string) => {
    const currentValue = paymentQuantity === "0.00" ? "" : paymentQuantity;

    const valueWithoutCommas = currentValue?.replace(/,/g, "");

    const newValueWithCommas = (valueWithoutCommas + value).replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

    // Limitar la cadena a un máximo de 10 caracteres
    const trimmedValue = newValueWithCommas.slice(0, 10);

    if (trimmedValue.length <= 10) {
      setPaymentQuantity(trimmedValue);
      handleTransactionQuantity(trimmedValue);
      console.log(currentTransaction);
    }
  };

  const addTransaction = (newTransaction: Transaction) => {
    setCreatePayment({
      ...createPayment,
      transactions: [...createPayment.transactions, newTransaction],
    });
    setPaymentQuantity("0.00");
  };

  const handleTransactionPaymentType = (paymentType: string) => {
    if (paymentType) {
      setCurrentTransaction({
        ...currentTransaction,
        paymentType: paymentType,
      });
    }
  };

  const handleTransactionQuantity = (newQuantity: string) => {
    // REVISAR ACA PARA FIXEAR EL PAGO D EMAS DE MIL PESOS TAMBIEN
    if (newQuantity) {
      setCurrentTransaction({
        ...currentTransaction,
        quantity: newQuantity,
      });
    }
  };
  const totalTransactions = createPayment.transactions.reduce(
    (acumulador, elemento) =>
      acumulador + parseFloat(elemento.quantity.replace(/,/g, "")),
    0
  );
  const currentPayment =
    parseFloat(currentBill?.checkTotal) - totalTransactions;

  useEffect(() => {
    if (!paymentQuantity) setPaymentQuantity("0.00");
    setCreatePayment({
      ...createPayment,
      cashier: "develop",
      check: "exampleCode",
      paymentDate: "aca la fecha",
      paymentTotal: currentBill.checkTotal,
      accountId: currentBill._id,
    });
    return setPaymentQuantity("0.00");
  }, []);

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
        <div>
          <div>
            <h3>{`Mesa  0${currentBill?.tableNum}`}</h3>
            <div className={styles.sectionRight}>
              <h3>{`Total: ${currentBill?.checkTotal}`}</h3>
              <button className={styles.actionBtn}>
                <img src={ActionsIcon} alt="burguer-menu" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className={styles.totalContainer}>
              <h2>{`$${paymentQuantity}`}</h2>
            </div>
            <div>
              <button
                className={
                  paymentType === "cash" ? styles.activePay : styles.keyboardBtn
                }
                onClick={() => {
                  handleTransactionPaymentType("cash");
                  setPaymentType("cash");
                }}
              >
                <img src={cashIcon} alt="cash-icon" />
                Efectivo
              </button>
              <button
                className={
                  paymentType === "debit"
                    ? styles.activePay
                    : styles.keyboardBtn
                }
                onClick={() => {
                  handleTransactionPaymentType("debit");
                  setPaymentType("debit");
                }}
              >
                <img src={cardIcon} alt="card-icon" />
                Débito
              </button>
              <button
                className={
                  paymentType === "credit"
                    ? styles.activePay
                    : styles.keyboardBtn
                }
                onClick={() => {
                  handleTransactionPaymentType("credit");
                  setPaymentType("credit");
                }}
              >
                <img src={cardIcon} alt="card-icon" />
                Crédito
              </button>
              <button
                className={
                  paymentType === "transfer"
                    ? styles.activePay
                    : styles.keyboardBtn
                }
                onClick={() => {
                  handleTransactionPaymentType("transfer");
                  setPaymentType("transfer");
                }}
              >
                <img src={transferIcon} alt="spei-icon" />
                Transferencia
              </button>
            </div>
            <div>
              <div>
                {keyboard?.map((item) => (
                  <button
                    value={item}
                    className={styles.keyboardItems}
                    onClick={() => {
                      handleChange(item);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className={styles.denominationsContainer}>
                {denominations?.map((item) => (
                  <button
                    disabled={currentPayment <= 0}
                    className={styles.denominationBtn}
                    onClick={() => {
                      addTransaction({ paymentType: "cash", quantity: item });
                    }}
                  >
                    ${item}
                  </button>
                ))}
                <button
                  className={styles.denominationBtn}
                  onClick={() => {
                    console.log(currentTransaction);
                    addTransaction(currentTransaction);
                    console.log(parseFloat(paymentQuantity.replace(/,/g, "")));
                    console.log(createPayment);
                    setPaymentType("cash");
                  }}
                  disabled={
                    currentPayment <= 0 ||
                    parseFloat(paymentQuantity) <= 0 ||
                    undefined
                  }
                >
                  <img src={checkLarge} alt="check-large-icon" />
                </button>
                <button
                  className={styles.denominationBtn}
                  onClick={() => {
                    setPaymentQuantity("0.00");
                  }}
                >
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
              <div className={styles.headPayment}>
                <h4>Forma de pago</h4>
                <h4>Importe</h4>
              </div>
              <img src={blueDivider} alt="divider-blue-icon" />
              <div className={styles.addPayContainer}>
                {createPayment?.transactions.map((element, index) => (
                  <div className={styles.transactionContainer} key={index}>
                    <span>
                      {element.paymentType === "cash"
                        ? "Efectivo"
                        : element.paymentType === "debit"
                        ? "Débito"
                        : element.paymentType === "credit"
                        ? "Crédito"
                        : element.paymentType === "transfer"
                        ? "Transferencia"
                        : ""}
                    </span>
                    <div>
                      <span>
                        $
                        {parseFloat(element.quantity.replace(/,/g, ""))
                          .toFixed(2)
                          .toString()}
                      </span>
                      <button
                        onClick={() => {
                          setCreatePayment({
                            ...createPayment,
                            transactions: createPayment.transactions.filter(
                              (element, currentIndex) => currentIndex !== index
                            ),
                          });
                        }}
                      >
                        <img src={deleteIcon} alt="delete-icon" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <img src={blueDivider} alt="divider-blue-icon" />
              <div className={styles.payTotal}>
                <h4>Diferencia</h4>
                <h4>${currentPayment.toFixed(2).toString()}</h4>
              </div>
            </div>
            <PrintButton
              setRevolve={setRevolve}
              handleLoading={handleLoading}
              openModal={openModal}
              onClose={onClose}
              createCurrentPayment={createPayment}
              diference={currentPayment}
              currentBill={currentBill}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
