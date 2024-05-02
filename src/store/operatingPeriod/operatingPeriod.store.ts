import { create } from "zustand";
import { getCategoriesService } from "../../services/categories.services";
import { getCurrentProcessService } from "../../services/operatingPeriod/operatingProcess.services";

interface state {
  isLoading: boolean;
  errors: boolean;
  messages: string;
  operatingPeriod: any[] | null;
  getCurrentPeriod: () => Promise<void>;
}

export const useOperationProcess = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    messages: "",
    operatingPeriod: null,
    getCurrentPeriod: async () => {
      try {
        const res = await getCurrentProcessService();
        set({ operatingPeriod: res.data });
      } catch (error) {
        set({ messages: "No se pudieron traer los reportes" });
      }
    },
  };
});
