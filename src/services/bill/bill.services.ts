import axios from "axios";

type BillName = {
  billName: string;
};

type Comments = {
  comments: string;
};

export const addName = async (id: string, billName: BillName) => {
  const res = await axios.put(
    `https://tomate-server.onrender.com/bills/${id}`,
    billName
  );
  return res;
};

export const addComments = async (id: string, comments: Comments) => {
  const res = await axios.put(
    `https://tomate-server.onrender.com/bills/${id}`,
    comments
  );
  return res;
};
