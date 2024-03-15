import { Children, useEffect, useState } from "react";
import styles from "./transferProducts.module.css";
import disquetIcon from "../../assets/icon/disquetIcon.svg";
import arrow from "../../assets/icon/selectArrow.svg";
import divider from "../../assets/icon/dividerTransfer.svg";
import { UseTableStore } from "../../store/tables.store";
import TableBoard from "../tableBoard/tableBoard";
interface Props {
  children: string;
  item: any;
  openModal: () => void;
}
export default function TransferProducts({ children, item, openModal }: Props) {
  // Zustand
  const getTablesArray = UseTableStore((state) => state.getTables);
  const tablesArray = UseTableStore((state) => state.tablesArray);
  //states
  const [toggleStatus, setToggleStatus] = useState(false);
  const [selectedNote, setSelectedNote] = useState("seleccion");
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [tableSearch, setTableSearch] = useState();

  const tableSelected = tablesArray.filter((element) => {
    return element.tableNum === tableSearch;
  });

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
    getTablesArray();
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
            selectedNote.products.length ? (
              selectedNote.products.map((element, index) => (
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
            ) : (
              <div className={styles.productBoxEmpty}>
                <h2>Nota actualmente vacia</h2>
              </div>
            )}
          </div>

          <div>
            {selectedProducts.length >= 3 ? (
              <button
                onClick={() => {
                  setSelectedProducts([]);
                }}
              >
                Limpiar todo
              </button>
            ) : (
              <button
                onClick={() => {
                  const currentProducts = selectedNote.products;
                  setSelectedProducts(currentProducts);
                }}
              >
                Seleccionar todo
              </button>
            )}
          </div>
        </div>
        <div className={styles.selectTable}>
          <TableBoard setting={setTableSearch} />
        </div>
        <div>
          {tableSelected && tableSelected[0]?.tableNum ? (
            <h2>{`Seleccionaste la mesa: ${tableSelected[0]?.tableNum}`}</h2>
          ) : tableSearch &&
            tableSearch.length > 0 &&
            (!tableSelected ||
              (tableSelected.length === 0 && tableSearch != "0")) ? (
            <h3
              className={styles.error}
            >{`Mesa número ${tableSearch} no se encuentra registrada`}</h3>
          ) : (
            <h2>Ingresa número de mesa</h2>
          )}
        </div>
      </div>
      <div className={styles.footerSection}>
        <button
          onClick={() => {
            console.log(tableSelected);
          }}
        >
          <img src={disquetIcon} alt="save-icon" />
          Guardar
        </button>
      </div>
    </article>
  );
}
