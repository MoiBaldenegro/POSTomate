import { useState } from "react";
import { User } from "../../../types/User";
import styles from "./register.module.css";
// Icons
import finger from "./../../../assets/icon/fingerIcon.svg";
import leftHand from "./../../../assets/icon/leftHand.svg";
import rightHand from "./../../../assets/icon/rightHand.svg";
import crossCancel from "./../../../assets/icon/crossCancel.svg";
interface Props {
  user: User;
}
export default function Register({ user }: Props) {
  const [startCapture, setStartCapture] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <main className={styles.container}>
      <section className={styles.headerRegister}>
        <div>{user.email.slice(0, 2).toLocaleUpperCase()}</div>
        <h1>{user.email}</h1>
      </section>
      {active ? (
        <section className={styles.registerProcess}>
          <div className={styles.handsContainer}>
            <div>
              <img className={styles.hand} src={rightHand} alt="right-hand" />
              {startCapture && <div className={styles.fingerIndicator}></div>}
            </div>
          </div>
          <div className={styles.indicatorsContainer}>
            {!startCapture && (
              <div>
                <p>
                  ¡Bienvenido! Para mejorar la seguridad, te invitamos a
                  registrar tu huella digital.
                </p>
                <span>
                  Asegúrate de que tus manos estén limpias y secas antes de
                  comenzar.
                </span>
                <button
                  onClick={() => {
                    setStartCapture(true);
                  }}
                  className={styles.startCaptureBtn}
                >
                  Iniciar captura
                </button>
              </div>
            )}

            {startCapture && (
              <div>
                <h2>Paso: {"1"}</h2>
                <div className={styles.indicatorsItemContainer}>
                  <span className={styles.processIndicator}>1</span>
                  <span className={styles.processIndicator}>2</span>
                  <span className={styles.processIndicator}>3</span>
                  <span className={styles.processIndicator}>4</span>
                </div>
                <button
                  className={styles.cancelBtn}
                  onClick={() => {
                    setStartCapture(false);
                  }}
                >
                  <img src={crossCancel} alt="cross-cancel" />
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className={styles.register}>
          <h2>No hay huellas asignadas</h2>
          <button
            onClick={() => {
              setActive(true);
            }}
          >
            <img src={finger} alt="finger-icon" />
            Comenzar registro
          </button>
        </section>
      )}
    </main>
  );
}
