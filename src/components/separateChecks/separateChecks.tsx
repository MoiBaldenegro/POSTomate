import styles from "./separateChecks.module.css";
import addIcon from "../../assets/icon/addItemIcon.svg";
import divider from "../../assets/icon/dividerInNote.svg";
import trashIcon from "../../assets/icon/trashIcon.svg";
import { useEffect, useState } from "react";

interface Props {
  item: any;
}

export default function SeparateChecks({ item }: Props) {
  const [separateNotes, setSeparateNotes] = useState<any[]>();
  const [selectedProducts, setSelectedProducts] = useState([]);

  function transferProducts() {}

  const NOTE_TEMPLATE = {
    checkCode: item.bill[0].billCode,
    noteNumber: "aca ponemos el indice",
    paymentCode: "aca clavamos el pago",
    sellType: item.bill[0].sellType,
    user: item.bill[0].user,
    products: [],
    checkTotal: "esto se renombrar a noteTotal",
    status: "enable",
    cashier: "revisar esto",
    paymentDate: "inesceria creo, refvisar...",
  };
  useEffect(() => {
    if (item.bill[0]) {
      setSeparateNotes([
        { ...NOTE_TEMPLATE, products: item.bill[0].products },
        { ...NOTE_TEMPLATE },
      ]);
    }
  }, []);

  return (
    <article className={styles.container}>
      <div className={styles.notesContainer}>
        {item.notes?.[0] ? (
          <></>
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
                    <div>
                      {element?.products.map((element: any, index: any) => (
                        <div className={styles.productBox}>
                          <div>
                            <span>{element.quantity}</span>
                            <span>{element.productName}</span>
                          </div>
                          <input type="checkbox" className={styles.check} />
                        </div>
                      ))}
                    </div>
                    <div>
                      <button>Mover aquí</button>
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
          }}
        >
          Guardar
        </button>
      </div>
    </article>
  );
}
