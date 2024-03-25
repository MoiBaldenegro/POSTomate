import styles from "./advanzedClosing.module.css";
import tillIcon from "../../../../assets/icon/tillIconTwo.svg";
import useDate from "../../../../hooks/useDate";
import crossButton from "../../../../assets/icon/crossButton.svg";
import dividerFinally from "../../../../assets/icon/dividerFinally.svg";
import cashCircle from "../../../../assets/icon/paperCash.svg";
import { IS_METALLIC, IS_PAPER, entrys } from "./constants";
import { useState } from "react";

export default function AdvanzedClosing() {
  const { currentDateTime, opcionesFecha, opcionesHora }: any = useDate();
  const formattedFecha = currentDateTime.toLocaleDateString(
    "es-ES",
    opcionesFecha
  );

  const [values, setValues] = useState(entrys.map(() => "")); // Inicializa un arreglo para almacenar los valores de los inputs

  // Función para manejar cambios en los inputs
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = newValue;
      return newValues;
    });
  };

  // Función para calcular el efectivo total
  const calcularEfectivoTotal = () => {
    let total = 0;
    values.forEach((value, index) => {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        total += parsedValue * entrys[index].value;
      }
    });
    return total.toFixed(2);
  };

  // Calcular el efectivo total una vez al inicio para evitar la llamada repetida en el JSX
  const efectivoTotal = parseFloat(calcularEfectivoTotal());

  return (
    <div className={styles.container}>
      <div>
        <div>
          <img src={tillIcon} alt="till-icon" />
          <h3>{`Cierre de caja`}</h3>
        </div>
        <div>
          <h3>{formattedFecha}</h3>
          <button>
            <img src={crossButton} alt="close-button" />
          </button>
        </div>
      </div>
      <div className={styles.mainSection}>
        <div>
          <div>
            <div>
              <h3 className={styles.quantity}>Cantidad</h3>
              <h3>Tipo</h3>
              <h3>Denominación</h3>
              <h3 className={styles.import}>Importe</h3>
            </div>
            <img src={dividerFinally} alt="divider-finally" />
          </div>
          <div className={styles.denominationBox}>
            {entrys.map((element, index) => (
              <div key={index}>
                <input
                  type="number"
                  placeholder="0"
                  value={values[index]}
                  onChange={(event) => handleInputChange(index, event)}
                />
                <h3>
                  {element.type === IS_PAPER
                    ? "Billete"
                    : element.type === IS_METALLIC
                    ? "Moneda"
                    : null}
                </h3>
                <h3>{element.tittle}</h3>
                <h3>{`${
                  !isNaN(parseFloat(values[index]))
                    ? (parseFloat(values[index]) * element.value).toFixed(2)
                    : "0"
                } MXN`}</h3>
              </div>
            ))}
          </div>
          <div>
            <img src={dividerFinally} alt="divider-finally" />
            <div>
              <div>
                <img src={cashCircle} alt="cash-circle" />
                <h3>Efectivo total: </h3>
              </div>
              <h3>{`$${!isNaN(efectivoTotal) ? efectivoTotal : "0"} MXN`}</h3>
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
