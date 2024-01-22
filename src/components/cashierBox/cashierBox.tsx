import styles from "./cashierBox.module.css";
// Hooks
import { useAccount } from "../../services/accounts/createAccount";
import { useNavigate } from "react-router-dom";
import tableFree from "../../assets/icon/tableFree.svg";
import { CashierBoxProps } from "../../types/props/cashierBoxProps";
// types
export default function CashierBox({ openModal, item, route }: CashierBoxProps) {
    const { createAccount, loading, newAccount }: any = useAccount();
    const navigate = useNavigate();

    const handleclick = () => {
        openModal();
    }
    if (!loading && newAccount?.code === 200) handleclick;
    return (
        <div className={styles.table} onClick={handleclick}>
            <div>
                <span>00.00</span>
                <span><img src="" alt="" />04</span>
            </div>
            <img src={tableFree} alt="table-free" />
            <p>{item.tableNum}</p>
            <span>{item.user}</span>
            <div>
                <span>00.00</span>
                <span><img src="" alt="" />04</span>
            </div>
        </div>
    )
}