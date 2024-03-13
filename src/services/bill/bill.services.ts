import axios from "axios";

type NoteName = {
  noteName: string;
};

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

export const createNotes = async (notesArray: any) => {
  const noteIds = [];
  try {
    for (const note of notesArray) {
      if (!note._id) {
        try {
          const res = await axios.post(
            "https://tomate-server.onrender.com/notes",
            note
          );

          if (res.data && res.data._id) {
            console.log(res.data._id);
            noteIds.push(res.data._id);
          } else {
            console.error("Error: No se recibió un ID para la nota.");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const res = await axios.put(
            `https://tomate-server.onrender.com/notes/${note._id}`,
            {
              products: note.products,
            }
          );
          noteIds.push(note._id);
        } catch (error) {
          console.error(error);
        }
      }
    }
    console.log(noteIds);
    return noteIds;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const injectNotesInBill = async (id: string, notesArray: any[]) => {
  const response = axios.put(`https://tomate-server.onrender.com/bills/${id}`, {
    notes: notesArray,
  });
  return response;
};

export const addNameInNote = async (id: string, noteName: NoteName) => {
  const response = axios.put(
    `https://tomate-server.onrender.com/notes/${id}`,
    noteName
  );
  return response;
};
