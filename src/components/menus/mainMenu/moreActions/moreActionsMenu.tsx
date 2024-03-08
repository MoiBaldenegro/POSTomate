import { ActionsKeyboard } from "../../../mainKeyboard/actionKeyboard";
import styles from "./moreActionsMenu.module.css";
import { actionsMenu } from "./configs/options";
import { useEffect, useState } from "react";
import { BILL_NAME, NOTES_NAME } from "./configs/constants";
import tomateIcon from "../../../../assets/icon/tomatePOSlogo.svg";
import UseAccount from "../../../../hooks/useAccount";
import Loader from "../../../loader/loader";
import errorIcon from "../../../../assets/icon/warning.svg";
import checkIcon from "../../../../assets/icon/checkIcon.svg";
import { useModal } from "../../../../hooks/useModal";
import ConfirmChanges from "../../../modals/confirm/confirmChanges";
import { CONFIRM_ACTIONS } from "../../../../configs/consts";
interface Props {
  isOpen: any;
  onClose: any;
  item: any;
}
export default function MoreActionsMenu({ onClose, item }: Props) {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [petition, setPetition] = useState(false);
  const accountProps = UseAccount();

  const confirmChanges = useModal(CONFIRM_ACTIONS);
  const actiontype = accountProps.changeKey;
  const errors = accountProps.errors;
  const isLoading = accountProps.isLoading;
  // El proble es que hay muchos loadings diferentes aca de diferentes peticiones

  useEffect(() => {
    console.log("aca es el que busco");
    console.log(errors);
  }, [errors]);
  return (
    <main className={styles.screen}>
      {confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_ACTIONS ? (
        <ConfirmChanges
          loading={isLoading}
          errors={errors}
          isOpen={confirmChanges.isOpen}
          onClose={confirmChanges.closeModal}
        >
          Cambios guardados
        </ConfirmChanges>
      ) : null}
      {!confirmChanges.isOpen && (
        <section className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose}>
            X
          </button>
          <div className={styles.actionsContainer}>
            {actionsMenu.map((element, index) => (
              <button
                key={index}
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
              <ActionsKeyboard
                actionType={actiontype}
                item={item}
                openModal={confirmChanges.openModal}
                caseTo={1}
              >
                Ingresa el nombre de la cuenta:
              </ActionsKeyboard>
            </>
          ) : selectedOption === NOTES_NAME ? (
            <>
              {" "}
              <ActionsKeyboard
                actionType={actiontype}
                item={item}
                openModal={confirmChanges.openModal}
                caseTo={2}
              >
                Ingresa el nombre de la nota:
              </ActionsKeyboard>{" "}
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
      )}
    </main>
  );
}
