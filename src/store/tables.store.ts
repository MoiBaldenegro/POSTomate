import { create } from "zustand";
import { getTablesService } from "../services/tables/tables";

interface state {
  isLoading: boolean;
  errors: boolean;
  tablesArray: [];
  getTables: () => Promise<void>;
}

export const UseTableStore = create<state>((set) => {
  return {
    isLoading: false,
    errors: false,
    tablesArray: [],
    getTables: async () => {
      try {
        const response = await getTablesService();
        if (!response.data) {
          set({ isLoading: false, errors: true });
        }
        set({ tablesArray: response.data });
        set({ isLoading: false });
        return response;
      } catch (error) {
        set({ isLoading: false, errors: true });
      }
    },
  };
});
