import styles from "./tableBox.module.css";
// Hooks
import { useAccount } from "../../services/accounts/createAccount";
import { useLocation, useNavigate } from "react-router-dom";
import tableFree from "../../assets/icon/tableFree.svg";
import tablePending from "../../assets/icon/tablePending.svg";
import tableEnable from "../../assets/icon/tableActive.svg";
import tablePayment from "../../assets/icon/tableForPayment.svg";
// types
import { Props } from "./types";
import { hostesAction } from "../../utils/roleActions/hostesAction";

export default function TableBox({ item, route }: Props) {
  const { loading, newAccount }: any = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  const handleclick = () => {
    alert(pathName);
    if (pathName === "/") {
      hostesAction(item.tableNum);
    }
    navigate(route, { state: { numTable: item.tableNum } });
  };
  if (!loading && newAccount?.code === 200) handleclick;
  return (
    <div className={styles.table} onClick={handleclick}>
      <div>
        <span>00.00</span>
        <span>
          <img src="" alt="" />
          04
        </span>
      </div>
      {item.status === "pending" ? (
        <img src={tablePending} alt="table-pending" />
      ) : item.status === "enable" ? (
        <img src={tableEnable} alt="table-enable" />
      ) : item.status === "forPayment" ? (
        <img src={tablePayment} alt="table-for-payment" />
      ) : (
        <img src={tableFree} alt="table-free" />
      )}

      <p>{item.tableNum}</p>
      <span>{item.server}</span>
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
