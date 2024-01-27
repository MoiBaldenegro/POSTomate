import UseAccount from "../../../hooks/useAccount";
import styles from "./printButton.module.css";

const PrintButton = () => {
  const { handlePrint } = UseAccount();

  return (
    <button
      onClick={() => {
        handlePrint("ticket");
      }}
      className={styles.printBtn}
    >
      Imprimir Ticket
    </button>
  );
};

export default PrintButton;
