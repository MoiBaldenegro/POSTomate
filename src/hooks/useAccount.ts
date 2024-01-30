import axios from "axios";
import { Bill } from "../types/account";
import { useState } from "react";

export default function UseAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [accountArray, setAccountArray] = useState<Bill[]>();
  const [newAccount, setNewAccount] = useState([]);

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

  async function getAccount() {
    setIsLoading(true);
    try {
      const res = await axios("https://tomate-server.onrender.com/bills");
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

  const handlePrint = async (process: string) => {
    const printers = ["192.168.1.88", "192.168.1.82"];

    printers?.forEach(async (item) => {
      try {
        const data = {
          items: [
            {
              name: "Producto 1",
              quantity: 2,
              price: 10.99,
            },
            {
              name: "Producto 2",
              quantity: 1,
              price: 24.99,
            },
          ],
          total: 46.97,
          tcp: item,
        };
        await axios.post(`http://localhost:8000/print/${process}`, data);
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
  };
}
