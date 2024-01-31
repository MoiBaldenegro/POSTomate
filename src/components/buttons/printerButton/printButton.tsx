import { useNavigate } from "react-router-dom";
import UseAccount from "../../../hooks/useAccount";
import UseTable from "../../../hooks/useTable";
import styles from "./printButton.module.css";
import { Bill } from "../../../types/account";
interface Props {
  currentBill: Bill | undefined;
}
const PrintButton = ({ currentBill }: Props) => {
  const { handlePrint } = UseAccount();
  //const { updateTable } = UseTable();
  const { updateBill } = UseAccount();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        // updateTable("free" /* aqui lcupoamos el ID de la mesa */),
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
