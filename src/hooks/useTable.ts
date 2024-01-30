import axios from "axios";
import { useState } from "react";
import { tables } from "../mocks/tables";

export default function UseTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [tablesArray, setTablesArray] = useState<any>();
  const [errors, setErrors] = useState(false);

  async function getTables() {
    setIsLoading(true);
    try {
      const res = await axios("https://tomate-server.onrender.com/tables");
      if (!res.data) {
        setIsLoading(false);
        setErrors(true);
        alert("No se ha podido encontrar la informacion de las mesas");
      }
      setIsLoading(false);
      const tableArray = res.data;
      console.log(`me ejecute: ${tableArray}`);
      setTablesArray(tableArray);
      return tableArray;
    } catch (error) {
      setIsLoading(false);
      setErrors(true);
      console.error(`Ha ocurrido algo inesperado: ${error}`);
    }
  }
  async function updateTable(statusChange: string, id: string) {
    /*   tables.map((item) => {
      if (item.tableNum === tableId) {
      }
    });  */
    try {
      const res = await axios.patch(
        `https://tomate-server.onrender.com/tables/${id}`,
        { status: statusChange }
      );
      if (!res.data) {
        setIsLoading(false);
        setErrors(true);
        alert("No se ha podido encontrar la informacion de las mesas");
      }
      setIsLoading(false);
      alert(res.data);
      return res.data;
    } catch (error) {
      setIsLoading(false);
      setErrors(true);
      console.error(`Ha ocurrido algo inesperado: ${error}`);
    }
  }
  // revisar los metodos locales

  function updateForPaymentTable(tableId: string) {
    tables.map((item) => {
      if (item.tableNum === tableId) {
        item.status = "forPayment";
      }
    });
  }
  function activeTable(tableId: string) {
    tables.map((item) => {
      if (item.tableNum === tableId) {
        item.status = "enable";
      }
    });
  }

  return {
    tablesArray,
    getTables,
    isLoading,
    errors,
    updateForPaymentTable,
    updateTable,
    activeTable,
  };
}
