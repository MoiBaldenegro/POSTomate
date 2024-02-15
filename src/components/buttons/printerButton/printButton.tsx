import { useNavigate } from "react-router-dom";
import UseAccount from "../../../hooks/useAccount";
import UseTable from "../../../hooks/useTable";
import styles from "./printButton.module.css";
import { Bill } from "../../../types/account";
import { useEffect } from "react";
import UsePayment from "../../../hooks/usePayments";
import { Payment } from "../../../types/payment";
interface Props {
  currentBill: Bill | undefined;
  diference: number;
  createCurrentPayment: Payment;
}
const PrintButton = ({
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
      disabled={diference >= 0}
      onClick={() => {
        const constPay = {
          ...createCurrentPayment,
          difference: (diference * -1).toString(),
        };
        createPayment(constPay);
        if (errors) {
          return;
        }
        updateTable("free", currentBill?.table, currentTable);
        updateBill("finished", currentBill),
          handlePrint("ticket", currentBill),
          navigate("/");
      }}
      className={styles.printBtn}
    >
      $ Pagar
    </button>
  );
};

export default PrintButton;
