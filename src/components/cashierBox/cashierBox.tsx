import styles from "./cashierBox.module.css";
// Hooks
import tableFree from "../../assets/icon/tableForPayment.svg";
import { CashierBoxProps } from "../../types/props/cashierBoxProps";
// types
export default function CashierBox({
  openModal,
  item,
  setting,
}: CashierBoxProps) {
  const handleclick = () => {
    openModal();
    setting(item);
  };
  return (
    <div className={styles.table} onClick={handleclick}>
      <div>
        <span>00.00</span>
        <span>
          <img src="" alt="" />
          04
        </span>
      </div>
      <img src={tableFree} alt="table-free" />
      <p>{item.tableNum}</p>
      <span>{item.user}</span>
      <div>
        <span>00.00</span>
        <span>
          <img src="" alt="" />
          04
        </span>
      </div>
    </div>
  );
}
