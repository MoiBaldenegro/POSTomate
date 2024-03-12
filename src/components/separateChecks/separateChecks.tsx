import styles from "./separateChecks.module.css";
import addIcon from "../../assets/icon/addItemIcon.svg";
import divider from "../../assets/icon/dividerInNote.svg";
import trashIcon from "../../assets/icon/trashIcon.svg";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { updateBillProps } from "../../store/updateBill";

interface Props {
  item: any;
  openModal: any;
}

export default function SeparateChecks({ item, openModal }: Props) {
  const [separateNotes, setSeparateNotes] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const createNotes = updateBillProps((state) => state.createNotes);

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

  const NOTE_TEMPLATE = {
    checkCode: item.bill[0]?.billCode.toString(),
    noteNumber: "aca ponemos el indice",
    paymentCode: "aca clavamos el pago",
    sellType: item.bill[0]?.sellType,
    user: item.bill[0]?.user,
    products: [],
    checkTotal: "esto se renombrar a noteTotal",
    status: "enable",
    cashier: "revisar esto",
    paymentDate: "inesceria creo, refvisar...",
  };

  useEffect(() => {
    if (!item.bill[0].notes.length) {
      const updatedProducts = item.bill[0].products.flatMap((element: any) => {
        if (element.quantity > 1) {
          const products = [];
          for (let i = 0; i < element.quantity; i++) {
            products.push({ ...element, quantity: 1, unique: uuidv4() });
          }
          return products;
        } else {
          return { ...element, unique: uuidv4() };
        }
      });

      setSeparateNotes([
        { ...NOTE_TEMPLATE, products: updatedProducts },
        { ...NOTE_TEMPLATE },
      ]);
      return;
    }
    const updatedNotes = [...item.bill[0].notes];
    const newData = updatedNotes.map((element, index) => {
      console.log(element);
      return {
        ...NOTE_TEMPLATE,
        noteNumber: element.noteNumber,
        products: element.products,
      };
    });
    setSeparateNotes(newData);
  }, []);

  return (
    <article className={styles.container}>
      <div className={styles.notesContainer}>
        {item.notes ? (
          <>aca hay notas ya creadas</>
        ) : (
          <>
            {separateNotes && separateNotes.length > 0 ? (
              <>
                {separateNotes.map((element, index) => (
                  <div>
                    <div>
                      <div>
                        <h3>Mesa: 0{item.tableNum}</h3>
                        <h3>Nota: 0{index + 1}</h3>
                      </div>
                      <img src={divider} alt="divider-icon" />
                    </div>
                    <div className={styles.productsContainer}>
                      {element?.products.map((element: any, index: any) => (
                        <div className={styles.productBox} key={index}>
                          <div>
                            <span>{element.quantity}</span>
                            <span>{element.productName}</span>
                          </div>
                          <input
                            type="checkbox"
                            className={styles.check}
                            checked={selectedProducts.some(
                              (selectedItem) =>
                                selectedItem.unique === element.unique
                            )}
                            onChange={() => {
                              handleProducts(element);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          if (selectedProducts.length > 0) {
                            setSeparateNotes((prevSeparateNotes) => {
                              if (!prevSeparateNotes) {
                                return prevSeparateNotes;
                              }

                              if (index !== -1) {
                                const updatedNotes = [...prevSeparateNotes];
                                updatedNotes[index].products.push(
                                  ...selectedProducts
                                );
                                updatedNotes.forEach((note, i) => {
                                  if (i !== index) {
                                    updatedNotes[i].products = updatedNotes[
                                      i
                                    ].products.filter(
                                      (product: any) =>
                                        !selectedProducts.includes(product)
                                    );
                                  }
                                });
                                return updatedNotes;
                              }

                              return prevSeparateNotes;
                            });

                            setSelectedProducts([]);
                          }
                        }}
                      >
                        Mover aquí
                      </button>
                    </div>
                  </div>
                ))}
                <div>
                  <button
                    onClick={() => {
                      const updateNotes = [
                        ...separateNotes,
                        { ...NOTE_TEMPLATE },
                      ];
                      setSeparateNotes(updateNotes);
                    }}
                  >
                    <img src={addIcon} alt="icon" />
                  </button>
                  <button
                    disabled={separateNotes.length <= 2}
                    onClick={() => {
                      const updateNotes = [...separateNotes.slice(0, -1)];
                      setSeparateNotes(updateNotes);
                    }}
                  >
                    <img src={trashIcon} alt="icon" />
                  </button>
                </div>
              </>
            ) : (
              <h1>MESA NO ACTIVA</h1>
            )}
          </>
        )}
      </div>
      <div className={styles.footerModal}>
        <h4>Cantidad de notas: {separateNotes?.length}</h4>
        <button
          onClick={() => {
            console.log(separateNotes);

            if (separateNotes?.length) {
              openModal();
              createNotes(separateNotes, item.bill[0]._id);
            }
          }}
        >
          Guardar
        </button>
      </div>
    </article>
  );
}
