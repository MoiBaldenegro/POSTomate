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
              <div className={styles.fingerIndicator}></div>
            </div>
          </div>
          <div className={styles.indicatorsContainer}>
            <p>
              ¡Bienvenido! Para mejorar la seguridad, te invitamos a registrar
              tu huella digital.
            </p>
            <div className={styles.instructions}>
              <span>
                - Asegúrate de que tus manos estén limpias y secas antes de
                comenzar.
              </span>{" "}
              <br />
              <span>
                - Coloca tu dedo en el sensor y Presiona tu dedo con firmeza.
              </span>
              <br />
              <span>
                - Mantén tu dedo en posición hasta que veas una confirmación en
                la pantalla.
              </span>
            </div>
            <h2>Paso: {"1"}</h2>
            <div className={styles.indicatorsItemContainer}>
              <span className={styles.processIndicator}>1</span>
              <span className={styles.processIndicator}>2</span>
              <span className={styles.processIndicator}>3</span>
              <span className={styles.processIndicator}>4</span>
            </div>
            <button className={styles.cancelBtn}>
              <img src={crossCancel} alt="cross-cancel" />
              Cancelar
            </button>
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
