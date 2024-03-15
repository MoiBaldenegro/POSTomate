import { Children, useEffect, useState } from "react";
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
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  function handleProducts(product: any) {
    if (
      selectedProducts.some(
        (selectedElement) => selectedElement.unique === product.unique
      )
    ) {
      // El producto ya está seleccionado, lo filtramos
      const updatedProducts = selectedProducts.filter(
        (selectedElement) => selectedElement.unique !== product.unique
      );
      setSelectedProducts(updatedProducts);
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  }

  useEffect(() => {
    if (item && item.bill[0] && item.bill[0]?.notes.length > 0) {
      setSelectedNote(item.bill[0]?.notes[0]);
    }
  }, []);
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
            <div>
              {item.bill[0]?.notes ? (
                <div className={styles.containerInput}>
                  <span>{`Mesa ${item.tableNum}`}</span>
                  <div className={styles.categoriesSelect}>
                    <div
                      className={styles.customSelect}
                      onClick={() => {
                        setToggleStatus(!toggleStatus);
                      }}
                    >
                      <div className={styles.selectTrigger}>
                        <span>
                          {selectedNote ? (
                            <>
                              {selectedNote.noteName
                                ? selectedNote.noteName.slice(0, 12)
                                : selectedNote.noteNumber
                                ? `Nota ${selectedNote.noteNumber}`
                                : `Nota ${item.bill[0]?.notes[0]?.noteNumber}`}
                            </>
                          ) : (
                            "Notas"
                          )}
                        </span>
                        <img
                          src={arrow}
                          alt=""
                          className={styles.arrowSelect}
                        />
                      </div>
                      <div
                        className={
                          toggleStatus ? styles.options : styles.hidden
                        }
                      >
                        {item.bill[0]?.notes.map((element, index) => (
                          <span
                            className={styles.option}
                            onClick={() => {
                              setSelectedNote(element);
                            }}
                          >
                            {element.noteName
                              ? element.noteName
                              : `Nota ${element.noteNumber}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              <img src={divider} alt="divider" />
            </div>
          </div>
          <div className={styles.productsContainer}>
            {selectedNote &&
            selectedNote.products &&
            selectedNote.products.length
              ? selectedNote.products.map((element, index) => (
                  <div className={styles.productBox} key={index}>
                    <span>{element.productName}</span>

                    <input
                      type="checkbox"
                      className={styles.check}
                      checked={selectedProducts.some(
                        (selectedItem) => selectedItem.unique === element.unique
                      )}
                      onChange={() => {
                        handleProducts(element);
                        console.log(selectedProducts);
                      }}
                    />
                  </div>
                ))
              : "otro"}
          </div>

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
