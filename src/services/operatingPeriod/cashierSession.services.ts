import axios from "axios";

const URL_PATH = "https://tomate-server.onrender.com/cashier-session";

export const getCashierSession = async () => {
  const response = axios(URL_PATH);
  return response;
};
