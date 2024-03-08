import styles from "./separateChecks.module.css";
import addIcon from "../../assets/icon/addItemIcon.svg";
import divider from "../../assets/icon/dividerInNote.svg";
import ProductBox from "../productBox/productBox";

export default function SeparateChecks() {
  return (
    <article className={styles.container}>
      <div className={styles.notesContainer}>
        <div>
          <div>
            <div>
              <h3>Nota: #</h3>
              <h3>#00</h3>
            </div>
            <img src={divider} alt="divider-icon" />
          </div>
          <div>
            <div className={styles.productBox}>
              <h2>Product Box</h2>
            </div>
          </div>
          <div>
            <button>Mover aquí</button>
          </div>
        </div>
        <div>
          <button>
            <img src={addIcon} alt="icon" />
          </button>
        </div>
      </div>
      <div className={styles.footerModal}>
        <button>Guardar</button>
      </div>
    </article>
  );
}
