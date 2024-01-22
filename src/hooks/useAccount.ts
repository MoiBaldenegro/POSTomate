import axios from "axios";
import { Bill } from "../types/account";
import { useState } from "react";


// aca

export default function UseAccount() {
    const [isLoading, setIsLoading] = useState(false);
    const [accountArray, setAccountArray] = useState<Bill[]>()
    const [newAccount, setNewAccount] = useState([])
    async function createAccount(account: Bill) {
        console.log(account)
        setIsLoading(true);
        try {
            setIsLoading(true);

            const response = await axios.post('https://tomate-server.onrender.com/bills', account);
            setIsLoading(false);
            if (!response.data) {
                throw new Error("No se encontro respuesta");
            }
            setNewAccount(response.data);
            alert("Enviado con exito")
            return response.data
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            throw new Error("Ha ocurrido un error inesperado");
        }
    }

    async function getAccount() {
        setIsLoading(true)
        try {
            const res = await axios('https://tomate-server.onrender.com/bills');
            if (!res.data) {
                setIsLoading(false);
                throw new Error("No se encontraron cuentas")
            }
            setIsLoading(false);
            const accounts = res.data;
            setAccountArray(accounts)
            return accounts;
        } catch (error) {
            setIsLoading(false);
            throw new Error("Ha ocurrido algo inesperado")
        }
    }
    return { isLoading, createAccount, newAccount, getAccount, accountArray }
}