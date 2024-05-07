import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com/cashier-session";

export const createCashierSession = async (quantity: string) => {
  const data = { initialQuantity: quantity };
  const response = axios.post(URL_PATH, data);
  return response;
};
