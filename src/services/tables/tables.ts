import axios from "axios";

export const getTablesService = async () => {
  const response = axios("https://tomate-server.onrender.com/tables");
  return response;
};
