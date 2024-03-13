import { Children } from "react";
import styles from "./transferProducts.module.css";
import disquetIcon from "../../assets/icon/disquetIcon.svg";
interface Props {
  children: string;
  item: any;
  openModal: () => void;
}
export default function TransferProducts({ children, item, openModal }: Props) {
  return (
    <article className={styles.container}>
      <div className={styles.head}>
        <span>1.- Seleccionar productos</span>
        <span>2.- Ingresar mesa</span>
        <span>3.- Transferir</span>
      </div>
      <div className={styles.mainSection}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.footerSection}>
        <button>
          <img src={disquetIcon} alt="save-icon" />
          Guardar
        </button>
      </div>
    </article>
  );
}
