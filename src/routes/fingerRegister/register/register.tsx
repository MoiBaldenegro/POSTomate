import { useState } from "react";
import { User } from "../../../types/User";
import styles from "./register.module.css";
import { FingerprintReader, SampleFormat } from "@digitalpersona/devices";
// Icons
import finger from "./../../../assets/icon/fingerIcon.svg";
import leftHand from "./../../../assets/icon/leftHand.svg";
import rightHand from "./../../../assets/icon/rightHand.svg";
import crossCancel from "./../../../assets/icon/crossCancel.svg";
import UseFingerCapture from "../../../hooks/useFingerCapture";
interface Props {
  user: User;
}
export default function Register({ user }: Props) {
  const { initReader, huella, setHuella, message } = UseFingerCapture();
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
                    initReader();
                  }}
                  className={styles.startCaptureBtn}
                >
                  Iniciar captura
                </button>
              </div>
            )}

            {startCapture && (
              <div>
                <span>
                  - Coloca tu dedo en el sensor y Presiona tu dedo con firmeza.
                </span>
                <br />
                <span>
                  - Mantén tu dedo en posición hasta que veas una confirmación
                  en la pantalla.
                </span>
                <div className={styles.indicatorsItemContainer}>
                  <button
                    disabled={!huella.length}
                    className={styles.processIndicator}
                  >
                    1
                  </button>
                  <button
                    disabled={huella.length <= 1}
                    className={styles.processIndicator}
                  >
                    2
                  </button>
                  <button
                    disabled={huella.length <= 2}
                    className={styles.processIndicator}
                  >
                    3
                  </button>
                  <button
                    disabled={huella.length <= 3}
                    className={styles.processIndicator}
                  >
                    4
                  </button>
                </div>
                {huella && huella.length >= 4 ? (
                  <button
                    className={styles.sendFingerBtn}
                    onClick={() => {
                      setStartCapture(false);
                      setHuella([]);
                    }}
                  >
                    <img src={crossCancel} alt="cross-cancel" />
                    Guardar
                  </button>
                ) : (
                  <button
                    className={styles.cancelBtn}
                    onClick={() => {
                      setStartCapture(false);
                      setHuella([]);
                    }}
                  >
                    <img src={crossCancel} alt="cross-cancel" />
                    Cancelar
                  </button>
                )}

                {huella.length}
                {message && (
                  <strong className={styles.message}>{message}</strong>
                )}
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
