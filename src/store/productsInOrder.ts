import { Bill } from "../types/account";
import { create } from "zustand";

interface state {
  BillCommandCurrent: Bill;
  setState: (form: Bill) => void;
}
export const useCurrentCommand = create<state>((set) => {
  return {
    BillCommandCurrent: {
      sellType: "onSite",
      user: "Moises",
      checkTotal: "0.00",
      products: [],
      status: "enable",
      paymentDate: "ZUSTAND ES LA HOSTIA TIO",
      tableNum: "s/N",
      table: undefined,
    },
    setState: (form: Bill) => {
      console.log(form);
      const checkTotalNew = form.products
        .reduce(
          (a, b) =>
            a + parseFloat(b.quantity > 1 ? b.priceInSiteBill : b.priceInSite),
          0
        )
        .toFixed(2)
        .toString();

      const actualyForm = { ...form, checkTotal: checkTotalNew };
      console.log(actualyForm);
      set({ BillCommandCurrent: actualyForm });
    },
  };
});
