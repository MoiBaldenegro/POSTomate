import { create } from "zustand";
import { updateNoteService } from "../services/orders/billWithNote.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: null | string;
  updateNote: (id: string, arg: {}) => Promise<void>;
}

export const useNotesStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    updateNote: async (id, arg) => {
      set({ isLoading: true });
      try {
        const res = await updateNoteService(id, arg);

        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se actualizo la nota",
          });
        }
        /*
        if (res.status === 200) {
          try {
            // aca actualizaremos la cuenta
          } catch (error) {}
        }
        */
        set({ isLoading: false });
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: "No se actualizo la nota",
        });
      }
    },
  };
});
