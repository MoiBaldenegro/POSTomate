import {
  HeaderTwo,
  useAuthStore,
  useModal,
  useNavigate,
} from "../sells/imports";
import styles from "./tablesControl.module.css";
import logOutIcon from "../../assets/icon/logOutIcon.svg";
import homeIcon from "../../assets/icon/homeButtonIcon.svg";
import { SELL_TYPES_PATH } from "../../lib/routes.paths.lib";
import { UseTableStore } from "../../store/tables.store";
import { useEffect, useState } from "react";
import UseUsers from "../../hooks/useUsers";
import tableBase from "../../assets/icon/tableBase.svg";
import tableSelected from "../../assets/icon/tableBaseSelected.svg";
import disquetIcon from "../../assets/icon/disquetIcon.svg";
import undoIcon from "../../assets/icon/undoIcon.svg";
import cleanicon from "../../assets/icon/cleanIcon.svg";
import tittleIcon from "../../assets/icon/tablePanelPeople.svg";
import assignedTable from "../../assets/icon/assignedTable.svg";
import divider from "../../assets/icon/divider1000.svg";
import dividerBtn from "../../assets/icon/dividerBtn.svg";
import { useUsersStore } from "../../store/users.store";
import { Table } from "./type";
import { CONFIRM_CHANGES } from "../../lib/modals.lib";
import ConfirmChanges from "../../components/modals/confirm/confirmChanges";
import disabledTable from "../../assets/icon/disabledTable.svg";
import deleteIcon from "../../assets/icon/deleteIcon.svg";
import bloquedBtn from "../../assets/icon/bloquedBtn.svg";
import reEnableIcon from "../../assets/icon/reEnable.svg";

export default function TablesControl() {
  const resetAllTables = UseTableStore((state) => state.resetTables);
  const logOutRequest = useAuthStore((state) => state.logOutRequest);
  const navigate = useNavigate();
  const tablesArray = UseTableStore((state) => state.tablesArray);
  const getTables = UseTableStore((state) => state.getTables);
  const updateTables = UseTableStore((state) => state.updateTables);
  const isLoading = UseTableStore((state) => state.isLoading);
  const errors = UseTableStore((state) => state.errors);
  const { usersArray, getUsers } = UseUsers();
  // states
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  // Request
  const asingTables = useUsersStore((state) => state.updateUser);
  const tablesValues = { tables: selectedTables };
  // modals
  const confirmChanges = useModal(CONFIRM_CHANGES);
  useEffect(() => {
    console.log(tablesArray);
    getTables();
    getUsers();
  }, []);
  return (
    <div className={styles.container}>
      <HeaderTwo />
      {confirmChanges.isOpen && confirmChanges.modalName === CONFIRM_CHANGES ? (
        <ConfirmChanges
          actionType={getTables}
          loading={isLoading}
          errors={errors}
          isOpen={confirmChanges.isOpen}
          onClose={confirmChanges.closeModal}
        >
          Cambios Guardados
        </ConfirmChanges>
      ) : null}
      <div className={styles.mainSection}>
        <div>
          {tablesArray.map((item: Table, index) => (
            <div
              onClick={() => {
                if (!item.active) {
                  return;
                }
                if (item.assigned) {
                  return;
                }
                if (selectedUser) {
                  const alreadySelected = selectedTables.includes(item._id);

                  if (alreadySelected) {
                    setSelectedTables(
                      selectedTables.filter((id) => id !== item._id)
                    );
                  } else {
                    setSelectedTables([...selectedTables, item._id]);
                  }
                }
                return;
              }}
              /*
              style={
                selectedTables.includes(item._id)
                  ? { background: "rgba(167, 92, 57, 1)" }
                  : {}
              }
              */
            >
              {item.zone ? <h4>{item.zone}</h4> : <></>}
              {item.assigned ? (
                <h5>{`${item?.user?.name
                  .slice(0, 1)
                  .toUpperCase()}${item?.user?.name
                  .slice(1, 11)
                  .toLowerCase()}`}</h5>
              ) : (
                <></>
              )}
              <h3 key={index}>{item.tableNum}</h3>
              {!item.active ? (
                <img src={disabledTable} alt="table-icon" />
              ) : item.assigned ? (
                <img src={assignedTable} alt="table-icon" />
              ) : selectedTables.includes(item._id) ? (
                <img src={tableSelected} alt="table-icon" />
              ) : (
                <img src={tableBase} alt="table-icon" />
              )}
            </div>
          ))}
        </div>
        <div>
          <div>
            <img src={tittleIcon} alt="tittle-icon" />
            <h3>Empleados</h3>
          </div>
          <div>
            <h3>Código</h3>
            <h3>Nombre</h3>
            <h3>Perfil</h3>
            <div>
              <img src={divider} alt="divider-table" />
            </div>
          </div>
          <div>
            {usersArray?.map((element: any) => (
              <div
                className={styles.userBox}
                style={
                  selectedUser === element._id
                    ? { background: "rgba(167, 92, 57, 1)" }
                    : {}
                }
                onClick={() => {
                  setSelectedTables([]);
                  setSelectedUser(element._id);
                }}
              >
                <h4>{element.employeeNumber}</h4>
                <h4>{element.name.toUpperCase().slice(0, 18)}</h4>
                <h4>{element.role?.profileName?.toUpperCase().slice(0, 17)}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer>
        <div>
          <button
            onClick={() => {
              logOutRequest();
            }}
          >
            <img src={logOutIcon} alt="back-icon" />
            Salir
          </button>
          <button
            onClick={() => {
              navigate(`/${SELL_TYPES_PATH}`);
            }}
          >
            <img src={homeIcon} alt="home-icon" />
            Inicio
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              /* ACA SEGUIMOS */
            }}
          >
            <img src={bloquedBtn} alt="bloqued-button-icon" />
            Desactivar
          </button>
          <button>
            <img src={reEnableIcon} alt="reenable-icon" />
            Reactivar
          </button>
          <img src={dividerBtn} alt="divider-buttons" />
          <button
            onClick={() => {
              resetAllTables();
              setSelectedTables([]);
              confirmChanges.openModal();
            }}
          >
            <img src={deleteIcon} alt="delete-icon" />
            Liberar mesas
          </button>
          <img src={dividerBtn} alt="divider-buttons" />
          <button
            onClick={() => {
              setSelectedTables([]);
            }}
          >
            <img src={cleanicon} alt="clean-icon" className={styles.clean} />
            Borrar todo
          </button>
          <button
            onClick={() => {
              setSelectedTables(selectedTables.slice(0, -1));
            }}
          >
            <img src={undoIcon} alt="undo-icon" />
            Deshacer
          </button>
          <button
            onClick={async () => {
              asingTables(tablesValues, selectedUser);
              const requestItems = selectedTables.map((element) => ({
                _id: element,
                assigned: true,
              }));
              updateTables(requestItems, selectedUser);
              confirmChanges.openModal();
            }}
          >
            <img src={disquetIcon} alt="save-icon" />
            Guardar
          </button>
        </div>
        <div></div>
      </footer>
    </div>
  );
}
