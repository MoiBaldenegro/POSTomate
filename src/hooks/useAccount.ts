import axios from "axios";
import { Bill } from "../types/account";
import { useState } from "react";

export default function UseAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [accountArray, setAccountArray] = useState<Bill[]>();
  const [newAccount, setNewAccount] = useState([]);
  const [errors, setErrors] = useState(false);
  const [currentBill, setCurrentBill] = useState();

  async function createAccount(account: Bill) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://tomate-server.onrender.com/bills",
        account
      );
      setIsLoading(false);
      if (!response.data) {
        throw new Error("No se encontro respuesta");
      }
      setNewAccount(response.data);
      alert("Enviado con exito");
      return response.data;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      throw new Error("Ha ocurrido un error inesperado");
    }
  }
  async function getBills() {
    setIsLoading(true);
    try {
      const res = await axios(`https://tomate-server.onrender.com/bills`);
      if (!res.data) {
        setIsLoading(false);
        throw new Error("No se encontraron cuentas");
      }
      setIsLoading(false);
      const accounts = res.data;
      setAccountArray(accounts);
      return accounts;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  async function getAccount(id: string) {
    setIsLoading(true);
    try {
      const res = await axios(`https://tomate-server.onrender.com/bills/${id}`);
      if (!res.data) {
        setIsLoading(false);
        throw new Error("No se encontraron cuentas");
      }
      setIsLoading(false);
      const accounts = res.data;
      setCurrentBill(accounts);
      return accounts;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  async function updateBill(
    statusChange: string,
    currentBill: any,
    form?: any
  ) {
    /*   tables.map((item) => {
      if (item.tableNum === tableId) {
      }
    });  */
    const id = currentBill._id;
    const currentProducts = form?.products ?? currentBill.products;
    console.log("ACA ACA");
    console.log(currentBill.products);
    try {
      const res = await axios.put(
        `https://tomate-server.onrender.com/bills/${id}`,
        { status: statusChange, products: currentProducts }
      );
      if (!res.data) {
        setIsLoading(false);
        setErrors(true);
        alert("No se ha podido encontrar la informacion de las mesas");
      }
      setIsLoading(false);
      return res.data;
    } catch (error) {
      setIsLoading(false);
      setErrors(true);
      console.error(`Ha ocurrido algo inesperado: ${error}`);
    }
  }
  async function addBill(statusChange: string, id: string) {
    /*   tables.map((item) => {
      if (item.tableNum === tableId) {
      }
    });  */
    try {
      const res = await axios.patch(
        `https://tomate-server.onrender.com/tables/${id}`,
        { bill: [statusChange] }
      );
      if (!res.data) {
        setIsLoading(false);
        setErrors(true);
        alert("No se ha podido encontrar la informacion de las mesas");
      }
      setIsLoading(false);
      return res.data;
    } catch (error) {
      setIsLoading(false);
      setErrors(true);
      console.error(`Ha ocurrido algo inesperado: ${error}`);
    }
  }

  const handlePrint = async (process: string, billPrint: Bill | undefined) => {
    console.log(billPrint);
    const printers = ["192.168.1.88", "192.168.1.82"];

    printers?.forEach(async (item) => {
      try {
        await axios.post(`http://localhost:8000/print/${process}`, billPrint);
        console.log("Ticket enviado para impresión");
      } catch (error) {
        console.error("Error al enviar el ticket para impresión", error);
      }
    });
  };

  return {
    isLoading,
    createAccount,
    newAccount,
    getAccount,
    accountArray,
    handlePrint,
    updateBill,
    addBill,
    currentBill,
    getBills,
  };
}
