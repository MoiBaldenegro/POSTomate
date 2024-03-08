import { create } from "zustand";
import { addComments, addName } from "../services/bill/bill.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  updateName: (id: string, arg: string) => Promise<void>;
  updateComments: (id: string, arg: string) => Promise<void>;
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
        if (!response) {
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
  };
});
