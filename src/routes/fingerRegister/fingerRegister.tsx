// styles
import HeaderOne from "../../components/headers/headerOne/headerOne";
import HeaderTwo from "../../components/headers/headerTwo/headerTwo";
import styles from "./fingerRegister.module.css";
// icons
import divider from "./../../assets/icon/dividerUsers.svg";
import searchIcon from "./../../assets/icon/searchIcon.svg";
import usersCircleIcon from "./../../assets/icon/usersCircleIcon.svg";
import homeButtonIcon from "./../../assets/icon/homeButtonIcon.svg";
import registerFingerIcon from "./../../assets/icon/RegisterFingerIcon.svg";
import UseUsers from "../../hooks/useUsers";
import { useEffect } from "react";

export default function FingerRegister() {
  const { usersArray, getUsers } = UseUsers();

  useEffect(() => {
    getUsers();
    console.log(usersArray);
  }, []);
  return (
    <div className={styles.container}>
      <HeaderTwo />
      <main>
        <section>
          <div>
            <img src={registerFingerIcon} alt="register-finger-icon" />
            <h2>Registro de huellas</h2>
          </div>
          <div></div>
        </section>
        <section className={styles.employeesContainer}>
          <div>
            <img src={usersCircleIcon} alt="users-icon-circle" />
            <h1>Empleados</h1>
          </div>
          <div>
            <img src={searchIcon} alt="search-icon" />
            <input
              placeholder="Dave mustaine...    James hetfield...    etc..."
              type="search"
            />
          </div>
          <div>
            <div className={styles.usersContainerHeader}>
              <h2>Código</h2>
              <h2>Nombre completo</h2>
              <h2>huella</h2>
            </div>
            <img src={divider} alt="divider" />
            {usersArray?.map((element: any) => (
              <div className={styles.userBox}>
                <div className={styles.avatar}>
                  <h1>{element.email.slice(0, 2).toUpperCase()}</h1>
                </div>
                <h1>{element.email}</h1>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <button>
          <img src={homeButtonIcon} alt="home-icon" />
          Inicio
        </button>
      </footer>
    </div>
  );
}
