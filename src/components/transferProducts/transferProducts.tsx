import { Children, useState } from "react";
import styles from "./transferProducts.module.css";
import disquetIcon from "../../assets/icon/disquetIcon.svg";
import arrow from "../../assets/icon/selectArrow.svg";
import divider from "../../assets/icon/dividerTransfer.svg";
interface Props {
  children: string;
  item: any;
  openModal: () => void;
}
export default function TransferProducts({ children, item, openModal }: Props) {
  const [toggleStatus, setToggleStatus] = useState(false);
  const [selectedNote, setSelectedNote] = useState("seleccion");
  return (
    <article className={styles.container}>
      <div className={styles.head}>
        <span>1.- Seleccionar productos</span>
        <span>2.- Ingresar mesa</span>
        <span>3.- Transferir</span>
      </div>
      <div className={styles.mainSection}>
        <div>
          <div>
            <span>{`Mesa ${item.tableNum}`}</span>
            {item.bill[0]?.notes ? (
              <div className={styles.containerInput}>
                <div className={styles.categoriesSelect}>
                  <div
                    className={styles.customSelect}
                    onClick={() => {
                      setToggleStatus(!toggleStatus);
                    }}
                  >
                    <div className={styles.selectTrigger}>
                      <span>{selectedNote}</span>
                      <img src={arrow} alt="" className={styles.arrowSelect} />
                    </div>
                    <div
                      className={toggleStatus ? styles.options : styles.hidden}
                    >
                      {item.bill[0]?.notes.map((element, index) => (
                        <span className={styles.option}>
                          {element.noteNumber}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <img src={divider} alt="divider" />
          <div></div>
          <div></div>
        </div>
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
