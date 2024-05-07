import { create } from "zustand";
import { createCashierSession } from "../../services/operatingPeriod/cashierSession.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  cashierSession: [];
  createSession: (quantity: string) => Promise<{}>;
}

export const useCashierSessionStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    cashierSession: [],
    createSession: async (quantity) => {
      set({ isLoading: true });
      try {
        const res = await createCashierSession(quantity);
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se pudo crear la session",
          });
        }
        set({ isLoading: false });
        return res.data;
      } catch (error) {
        set({
          isLoading: false,
          errors: false,
          message: `No se pudo crear la session. mas informacion: ${error}`,
        });
      }
    },
  };
});
