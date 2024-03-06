import { ActionsKeyboard } from "../../../mainKeyboard/actionKeyboard";
import styles from "./moreActionsMenu.module.css";
import { actionsMenu } from "./configs/options";
import { useState } from "react";
import { BILL_NAME } from "./configs/constants";
import tomateIcon from "../../../../assets/icon/tomatePOSlogo.svg";
interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}
export default function MoreActionsMenu({ isOpen, onClose, children }: Props) {
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <main className={styles.screen}>
      <section className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div className={styles.actionsContainer}>
          {actionsMenu.map((element, index) => (
            <button
              style={
                selectedOption === element.set
                  ? { background: "white", color: "#000" }
                  : {}
              }
              onClick={() => {
                setSelectedOption(element.set);
              }}
            >
              {element.option}
            </button>
          ))}
        </div>
        {selectedOption === BILL_NAME ? (
          <>
            <ActionsKeyboard>Ingresa el nombre de la cuenta</ActionsKeyboard>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "1200px",
              fontSize: "32px",
            }}
          >
            {selectedOption === "" ? (
              <img
                src={tomateIcon}
                alt="tomate-icon"
                style={{ height: "100px", margin: "25px" }}
              />
            ) : (
              <>
                {" "}
                <strong>{selectedOption}: En construccion...</strong>
                <img
                  src={tomateIcon}
                  alt="tomate-icon"
                  style={{ height: "100px", margin: "25px" }}
                />
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
