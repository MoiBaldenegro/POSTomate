import axios from "axios";
import { create } from "zustand";
import { getCashierSession } from "../../services/operatingPeriod/cashierSession.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  message: string | null;
  cashierSession: [];
  getCashierSession: () => Promise<void>;
}

export const useCashierSessionStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    message: null,
    cashierSession: [],
    getCashierSession: async () => {
      try {
        set({ isLoading: true });
        const res = await getCashierSession();
        if (!res.data) {
          set({
            isLoading: false,
            errors: true,
            message: "No se recuperaron sessiones activas",
          });
        }
        set({ isLoading: false });
        return res.data;
      } catch (error) {
        set({
          isLoading: false,
          errors: true,
          message: "Ha ocurrido algo inesperado",
        });
      }
    },
  };
});
