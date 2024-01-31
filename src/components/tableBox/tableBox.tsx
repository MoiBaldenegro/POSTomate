import styles from "./tableBox.module.css";
// Hooks
import { useAccount } from "../../services/accounts/createAccount";
import { useLocation, useNavigate } from "react-router-dom";
import tableFree from "../../assets/icon/tableFree.svg";
import tablePending from "../../assets/icon/tablePending.svg";
import tableEnable from "../../assets/icon/tableActive.svg";
import tablePayment from "../../assets/icon/tableForPayment.svg";
// types
import UseTable from "../../hooks/useTable";

export default function TableBox(
  { item, route }: any /* AJUSTAR EL TYPE DE PROPS DE MESA (TABLE) COMPLETO */
) {
  const { loading, newAccount }: any = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const { updateTable } = UseTable();

  const handleclick = () => {
    if (pathName === "/") {
      if (item.status !== "free") {
        return;
      }
      updateTable("pending", item._id);
      navigate(route);
    } else if (pathName === "/tables") {
      if (item.status === "free" || item.status === "forPayment") {
        return;
      }
      if (item.status === "pending") {
        navigate(route, {
          state: {
            numTable: item.tableNum,
            _id: item._id,
            status: item.status,
          },
        });
        return; // aca recuperaremos la cuenta activa
      }
      if (item.status === "enable") {
        navigate(route, {
          state: {
            numTable: item.tableNum,
            _id: item.bill,
            status: item.status,
            billCurrent: item.bill[0],
          },
        });
        return;
      }
    } else {
      return;
    }
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
      {item && item.status === "pending" ? (
        <img src={tablePending} alt="table-pending" />
      ) : item && item.status === "enable" ? (
        <img src={tableEnable} alt="table-enable" />
      ) : item && item.status === "forPayment" ? (
        <img src={tablePayment} alt="table-for-payment" />
      ) : (
        <img src={tableFree} alt="table-free" />
      )}

      {/*item.status === "pending" ? (
        <img src={tablePending} alt="table-pending" />
      ) : item.status === "enable" ? (
        <img src={tableEnable} alt="table-enable" />
      ) : item.status === "forPayment" ? (
        <img src={tablePayment} alt="table-for-payment" />
      ) : (
        <img src={tableFree} alt="table-free" />
      ) */}
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
