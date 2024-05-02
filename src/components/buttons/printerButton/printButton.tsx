import { useNavigate } from "react-router-dom";
import UseAccount from "../../../hooks/useAccount";
import UseTable from "../../../hooks/useTable";
import styles from "./printButton.module.css";
import { Bill } from "../../../types/account";
import { useEffect } from "react";
import UsePayment from "../../../hooks/usePayments";
import { Payment } from "../../../types/payment";

interface Props {
  setRevolve: (value: string) => void;
  handleLoading: (value: boolean) => void;
  openModal: () => void;
  onClose: () => void;
  currentBill: Bill | undefined;
  diference: number;
  createCurrentPayment: Payment;
}
const PrintButton = ({
  setRevolve,
  handleLoading,
  openModal,
  onClose,
  currentBill,
  diference,
  createCurrentPayment,
}: Props) => {
  const { createPayment, errors } = UsePayment();
  const { handlePrint } = UseAccount();
  const { updateTable, getOneTable, currentTable } = UseTable();
  const { updateBill } = UseAccount();
  const navigate = useNavigate();
  useEffect(() => {
    getOneTable(currentBill?.table);
  }, []);

  return (
    <button
      disabled={diference > 0}
      onClick={() => {
        handleLoading(true);
        onClose();
        const constPay = {
          ...createCurrentPayment,
          difference: (diference * -1).toString(),
        };
        createPayment(constPay);
        if (!errors) {
          setTimeout(() => {
            handleLoading(false);
          }, 400);
          openModal();
          setRevolve(constPay.difference);
          updateTable("free", currentBill?.table, currentTable);
          updateBill("finished", currentBill),
            handlePrint("ticket", currentBill),
            onClose();

          return;
          //navigate("/"); ////////////vERIFICAR LA NAVEGACION
        }
        setTimeout(() => {
          handleLoading(false);
        }, 400);
        setRevolve("error");
        onClose();
        //navigate("/"); ////////////vERIFICAR LA NAVEGACION
      }}
      className={styles.printBtn}
    >
      $ Pagar
    </button>
  );
};

export default PrintButton;
