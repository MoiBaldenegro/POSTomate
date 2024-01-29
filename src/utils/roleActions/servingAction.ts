import UseTables from "../../hooks/useTables";

const { updateTable } = UseTables();

export const hostesAction = (tableId: string) => {
  updateTable(tableId);
};
