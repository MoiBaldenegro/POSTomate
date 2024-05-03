import axios from "axios";

const URL_PATH = "http://localhost:8000/notes/";

export const updateNoteService = async (id: string, noteData: {}) => {
  const response = await axios.put(`${URL_PATH}${id}`, noteData);
  return response;
};
