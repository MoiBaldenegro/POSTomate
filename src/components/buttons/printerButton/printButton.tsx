import { useNavigate } from "react-router-dom";
import UseAccount from "../../../hooks/useAccount";
import UseTable from "../../../hooks/useTable";
import styles from "./printButton.module.css";
import { Bill } from "../../../types/account";
import { useEffect } from "react";
interface Props {
  currentBill: Bill | undefined;
}
const PrintButton = ({ currentBill }: Props) => {
  const { handlePrint } = UseAccount();
  const { updateTable, getOneTable, currentTable } = UseTable();
  const { updateBill } = UseAccount();
  const navigate = useNavigate();
  useEffect(() => {
    getOneTable(currentBill?.table);
  }, []);
  return (
    <button
      onClick={() => {
        updateTable("free", currentBill?.table, currentTable);
        updateBill("finished", currentBill),
          handlePrint("ticket"),
          navigate("/host");
      }}
      className={styles.printBtn}
    >
      Imprimir Ticket
    </button>
  );
};

export default PrintButton;
