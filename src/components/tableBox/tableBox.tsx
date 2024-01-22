import styles from "./tableBox.module.css";
// Hooks
import { useAccount } from "../../services/accounts/createAccount";
import { useNavigate } from "react-router-dom";
import tableFree from "../../assets/icon/tableFree.svg";
// types
import { Props } from "./types";
import { useState } from "react";
export default function TableBox({ item, route }: Props) {
  const { createAccount, loading, newAccount }: any = useAccount();
  const navigate = useNavigate();
  // Local state´s
  const [account, setAccount] = useState({
    sellType: "onSite",
    user: "Moises",
    checkTotal: "00.00",
    status: "enabled",
    paymentDate: "2024-01-08T12:00:00Z",
  });
  const handleclick = () => {
    createAccount(account);
    setAccount(newAccount);
    navigate(route);
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
      <img src={tableFree} alt="table-free" />
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
