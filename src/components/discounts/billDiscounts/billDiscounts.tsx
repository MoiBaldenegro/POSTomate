import DiscountBoard from "../../discountBoard/discount";
import styles from "./billDiscounts.module.css";
import rightArrow from "../../../assets/icon/arrowRight.svg";
import table from "./../../../assets/icon/tableActive.svg";
import { useState } from "react";

interface Props {
  item: any;
  openModal: () => void;
  children: string;
}

export default function BillDiscount({ item, openModal, children }: Props) {
  const [noteForDiscount, setNoteForDiscount] = useState();
  return (
    <div className={styles.container}>
      <div className={styles.discountContainer}>
        <div>
          <div>
            <h3> Descuento a mesa: {item.tableNum}</h3>
            <div>
              <img src={table} alt="table-icon" className={styles.table} />
              <strong>{item.tableNum}</strong>
            </div>
          </div>
          <div>
            <h3>2.-Ingresa descuento</h3>
            <DiscountBoard>ea la marea</DiscountBoard>
          </div>
        </div>
        <div>
          <button>
            <img src={rightArrow} alt="right-arrow" />
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
