// import { useEffect, useState } from "react";
// import axios from "axios";
import { tables } from "../mocks/tables";

export default function UseTables() {
  function updateTable(tableId: string) {
    tables.map((item) => {
      if (item.tableNum === tableId) {
        item.status = "pending";
      }
      return item;
    });
  }
  function updateForPaymentTable(tableId: string) {
    tables.map((item) => {
      if (item.tableNum === tableId) {
        item.status = "forPayment";
      }
      return item;
    });
  }
  function activeTable(tableId: string) {
    tables.map((item) => {
      if (item.tableNum === tableId) {
        item.status = "enable";
      }
      return item;
    });
  }
  return { updateTable, activeTable, updateForPaymentTable };

  /*
   const [isLoading, setIsLoading] = useState(false);
  const [accountArray, setAccountArray] = useState();

  const updateTable = async () => {
    setIsLoading(true);
    try {
      const res = await axios.patch("");
    } catch (error) {}
  };
  */
}
