import {
  BILL_CANCEL,
  BILL_DISCOUNTS,
  BILL_NAME,
  COMMENTS,
  COURTESY_APPLY,
  COURTESY_APPLY_BILL,
  COURTESY_APPLY_NOTES,
  COURTESY_APPLY_PRODUCTS,
  MOVE_PRODUCTS,
  MOVE_TABLE,
  NOTES_CANCEL,
  NOTES_DISCOUNTS,
  NOTES_NAME,
  PRODUCTS_CANCEL,
  PRODUCTS_DISCOUNTS,
  SEPARATE_CHECKS,
} from "./constants";

interface Action {
  option: string;
  set: string;
}
// spanish
export const actionsMenu: Action[] = [
  {
    option: "Nombre de la cuenta",
    set: BILL_NAME,
  },
  {
    option: "Nombre de las notas",
    set: NOTES_NAME,
  },
  {
    option: "Comentarios",
    set: COMMENTS,
  },
  {
    option: "Separar notas",
    set: SEPARATE_CHECKS,
  },
  {
    option: "Transferir productos",
    set: MOVE_PRODUCTS,
  },
  {
    option: "Cambiar mesa",
    set: MOVE_TABLE,
  },
  {
    option: "Descuentos en productos",
    set: PRODUCTS_DISCOUNTS,
  },
  {
    option: "Descuentos en notas",
    set: NOTES_DISCOUNTS,
  },
  {
    option: "Descuentos en cuenta",
    set: BILL_DISCOUNTS,
  },
  {
    option: "Cortesías de producto",
    set: COURTESY_APPLY_PRODUCTS,
  },
  {
    option: "Cortesías de nota",
    set: COURTESY_APPLY_NOTES,
  },
  {
    option: "Cortesía de cuenta",
    set: COURTESY_APPLY_BILL,
  },
  {
    option: "Cancelar productos",
    set: PRODUCTS_CANCEL,
  },
  {
    option: "Cancelar notas",
    set: NOTES_CANCEL,
  },
  {
    option: "Cancelar cuenta",
    set: BILL_CANCEL,
  },
];
