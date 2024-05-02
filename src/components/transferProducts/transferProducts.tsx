import { Children, useEffect, useState } from "react";
import styles from "./transferProducts.module.css";
import disquetIcon from "../../assets/icon/disquetIcon.svg";
import arrow from "../../assets/icon/selectArrow.svg";
import divider from "../../assets/icon/dividerTransfer.svg";
import { UseTableStore } from "../../store/tables.store";
import TableBoard from "../tableBoard/tableBoard";
import { UseActions } from "../../store/moreActions/moreActions.store";

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
  const [toggleStatusTransfer, setToggleStatusTransfer] = useState(false);
  const [selectedNote, setSelectedNote] = useState("seleccion");
  const [selectedNoteTransfer, setSelectedNoteTransfer] = useState("Seleccion");
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
    /*
    if (item && item.bill[0] && !item.bill[0]?.notes.length) {
      setSelectedNote(item.bill[0]?.notes[0]);
    }
    */
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
              : item.bill[0].products.map((element, index) => (
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
                ))}
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
          {tableSearch &&
          tableSearch.length > 0 &&
          (!tableSelected ||
            (tableSelected.length === 0 && tableSearch != "0")) ? (
            <h3
              className={styles.error}
            >{`Mesa número ${tableSearch} no se encuentra registrada`}</h3>
          ) : item.tableNum === tableSelected[0]?.tableNum ? (
            <h2>{`No es posible tranferir productos a la misma mesa`}</h2>
          ) : tableSelected[0] && tableSelected[0].status === "enable" ? (
            <div className={styles.transferContainer}>
              <div>
                {tableSelected[0]?.bill[0]?.notes.length ? (
                  <div className={styles.withNote}>
                    <h4>{`Mesa: ${tableSelected[0].tableNum}`}</h4>
                    <div>
                      <div className={styles.containerInput}>
                        <div className={styles.categoriesSelect}>
                          <div
                            className={styles.customSelect}
                            onClick={() => {
                              setToggleStatusTransfer(!toggleStatusTransfer);
                            }}
                          >
                            <div className={styles.selectTrigger}>
                              <span>
                                {selectedNoteTransfer ? (
                                  <>
                                    {selectedNoteTransfer.noteName
                                      ? selectedNoteTransfer.noteName.slice(
                                          0,
                                          12
                                        )
                                      : selectedNoteTransfer.noteNumber
                                      ? `Nota ${selectedNoteTransfer.noteNumber}`
                                      : `Seleccion`}
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
                                toggleStatusTransfer
                                  ? styles.options
                                  : styles.hidden
                              }
                            >
                              {tableSelected[0]?.bill[0].notes.map(
                                (element, index) => (
                                  <span
                                    className={styles.option}
                                    onClick={() => {
                                      setSelectedNoteTransfer(element);
                                    }}
                                  >
                                    {element.noteName
                                      ? element.noteName
                                      : `Nota ${element.noteNumber}`}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4>{`Mesa ${tableSelected[0]?.tableNum}`}</h4>
                  </>
                )}
                <img src={divider} alt="divider" />
              </div>
              <div>
                {tableSelected[0]?.bill[0]?.notes.length
                  ? selectedNoteTransfer?.products?.map((element, index) => (
                      <div key={index} className={styles.transferProductBox}>
                        {element.productName}
                      </div>
                    ))
                  : tableSelected[0]?.bill[0].products.map((element, index) => (
                      <div key={index} className={styles.transferProductBox}>
                        {element.productName}
                      </div>
                    ))}
              </div>
            </div>
          ) : tableSelected.length && tableSelected[0]?.status != "enable" ? (
            <h2>{"La mesa no se encuentra activa en este momento"}</h2>
          ) : (
            <h2>Ingresa número de mesa</h2>
          )}
        </div>
      </div>
      <div className={styles.footerSection}>
        <button
          onClick={() => {
            console.log(selectedNoteTransfer.products);
          }}
        >
          <img src={disquetIcon} alt="save-icon" />
          Guardar
        </button>
      </div>
    </article>
  );
}
