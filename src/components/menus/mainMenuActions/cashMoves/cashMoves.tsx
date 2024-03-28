import styles from "./cashMoves.module.css";
import cross from "../../../../assets/icon/crossButton.svg";
import tillOne from "../../../../assets/icon/tillMovesCircle.svg";
import process from "../../../../assets/icon/cicle.svg";
import orderIcon from "../../../../assets/icon/orderIcon.svg";

interface Props {
  onClose: () => void;
}
export default function CashMoves({ onClose }: Props) {
  return (
    <main className={styles.screen}>
      <div>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={cross} alt="close-button" />
        </button>
        <div>
          <button className={styles.closeButton} onClick={onClose}>
            <img src={cross} alt="close-button" />
          </button>
          <img src={tillOne} alt="till-icon" />
          <h3>Movimientos</h3>
        </div>
        <div>
          <div>
            <img src={process} alt="movements-icon" />
            <h3>Registrar nuevo movimiento</h3>
          </div>
          <div>
            <button>Entrada</button>
            <button>Salida</button>
          </div>
        </div>
        <div>
          <div>
            <div>
              <button>
                Movimiento <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Folio
                <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Cajero <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Movimiento <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Movimiento <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Movimiento <img src={orderIcon} alt="arrow-order" />
              </button>
              <button>
                Movimiento <img src={orderIcon} alt="arrow-order" />
              </button>
            </div>
            <div>2</div>
          </div>
        </div>
      </div>
    </main>
  );
}
