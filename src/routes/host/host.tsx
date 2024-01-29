//styles
import "../../styles/global/global.css";
import styles from "./host.module.css";
// Icons
import pendingIcon from "../../assets/icon/pending.svg";
import enableIcon from "../../assets/icon/enableIcon.svg";
import paymentIcon from "../../assets/icon/paymentIcon.svg";
import freeIcon from "../../assets/icon/freeIcon.svg";
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
// Vars
import { tables } from "../../mocks/tables";
import TableBox from "../../components/tableBox/tableBox";
// Dependecies

export default function Host() {
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <main className={styles.mainSection}>
        {tables?.map((item) => {
          const newItem = {
            ...item,
            status: "pending",
          };
          return (
            <div className={styles.grid} key={item.tableNum}>
              <TableBox item={item} route={"/host"} />
            </div>
          );
        })}
      </main>
      <footer className={styles.footer}>
        <div>
          <span>
            <img src={pendingIcon} alt="pending-icon" />
            En espera
          </span>
          <span>
            <img src={enableIcon} alt="enable-icon" />
            Activa
          </span>
          <span>
            <img src={paymentIcon} alt="payment-icon" />
            Por pagar
          </span>
          <span>
            <img src={freeIcon} alt="free-icon" />
            Libre
          </span>
        </div>
      </footer>
    </div>
  );
}
