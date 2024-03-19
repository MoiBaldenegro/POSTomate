import DiscountBoard from "../../discountBoard/discount";
import styles from "./notesDiscounts.module.css";
import rightArrow from "../../../assets/icon/arrowRight.svg";
import divider from "../../../assets/icon/dividerTransfer.svg";
import { useState } from "react";

interface Props {
  item: any;
  openModal: () => void;
  children: string;
}

export default function NotesDiscounts({ item, openModal, children }: Props) {
  const [noteForDiscount, setNoteForDiscount] = useState();
  return (
    <div className={styles.container}>
      <div className={styles.discountContainer}>
        <div>
          <div>
            <h3>1.- Selecciona la nota</h3>
            <div>
              <div className={styles.head}>
                <div>
                  {item.bill[0]?.notes ? (
                    <span>{`Mesa ${item.tableNum}`}</span>
                  ) : null}
                  <img src={divider} alt="divider" />
                </div>
              </div>
              <div className={styles.productsContainer}>
                {item.bill[0]?.notes ? (
                  item.bill[0]?.notes.map((element, index) => (
                    <div className={styles.productBox} key={index}>
                      <span>
                        {element.noteName
                          ? element.noteName
                          : `Nota: ${element.noteNumber}`}
                      </span>
                      <input
                        type="radio"
                        name="notes"
                        onChange={() => {
                          console.log(noteForDiscount);
                          if (
                            noteForDiscount &&
                            noteForDiscount.noteNumber === element.noteNumber
                          ) {
                            return;
                          }
                          setNoteForDiscount(element);
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className={styles.productBoxEmpty}>
                    <h2>Nota actualmente vacia</h2>
                  </div>
                )}
              </div>
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
