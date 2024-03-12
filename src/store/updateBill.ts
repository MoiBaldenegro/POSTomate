import { create } from "zustand";
import {
  addComments,
  addName,
  createNotes,
  injectNotesInBill,
} from "../services/bill/bill.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  updateName: (id: string, arg: string) => Promise<void>;
  updateComments: (id: string, arg: string) => Promise<void>;
  createNotes: (notesArray: any[], id: string) => Promise<void>;
}

export const updateBillProps = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,

    updateName: async (id, arg) => {
      set({ isLoading: true });
      const data = { billName: arg };
      try {
        const response = await addName(id, data);
        if (!response.data) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false });
        return response;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },

    updateComments: async (id, arg) => {
      set({ isLoading: true });
      const data = { comments: arg };
      try {
        const response = await addComments(id, data);
        if (!response) {
          set({ isLoading: false, errors: true });
        }
        set({ isLoading: false });
        return response;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },

    createNotes: async (notesArray, id) => {
      set({ isLoading: true });

      try {
        const noteIds = await createNotes(notesArray);

        if (!noteIds || noteIds.length === 0) {
          set({ isLoading: false, errors: true });
          return;
        }

        if (noteIds.length >= 2) {
          try {
            const res = await injectNotesInBill(id, noteIds);
            if (!res.data) {
              throw new Error("No se pudieron guardar las notas");
            }
          } catch (error) {
            console.error(error);
            throw new Error("Ha ocurrido algo inesperado");
          }
        }

        set({ isLoading: false });
      } catch (error) {
        console.error(error);
        set({ isLoading: false, errors: true });
      }
    },
  };
});
