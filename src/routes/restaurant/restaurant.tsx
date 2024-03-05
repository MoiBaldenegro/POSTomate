//styles
import "../../styles/global/global.css";
import styles from "./restaurant.module.css";
// Icons
import pendingIcon from "../../assets/icon/pending.svg";
import enableIcon from "../../assets/icon/enableIcon.svg";
import paymentIcon from "../../assets/icon/paymentIcon.svg";
import freeIcon from "../../assets/icon/freeIcon.svg";
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
// Vars
import TableBox from "../../components/tableBox/tableBox";
import { useEffect } from "react";
import UseTable from "../../hooks/useTable";
import { useModal } from "../../hooks/useModal";
import { OPEN_MORE_ACTIONS } from "../../configs/consts";
import MoreActionsMenu from "../../components/menus/mainMenu/moreActions/moreActionsMenu";
// Dependecies

export default function Restaurant() {
  const { getTables, tablesArray } = UseTable();
  const openMoreActions = useModal(OPEN_MORE_ACTIONS);
  useEffect(() => {
    getTables();
  }, []);
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <main className={styles.mainSection}>
        {openMoreActions.isOpen &&
        openMoreActions.modalName === OPEN_MORE_ACTIONS ? (
          <MoreActionsMenu
            isOpen={openMoreActions.isOpen}
            onClose={openMoreActions.closeModal}
          >
            ""
          </MoreActionsMenu>
        ) : null}
        {tablesArray?.map((item: any) => (
          <div className={styles.grid}>
            <TableBox
              item={item}
              route={"/restaurant-order/:item"}
              openModal={openMoreActions.openModal}
            />
          </div>
        ))}
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
