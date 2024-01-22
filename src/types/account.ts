import { Product } from "./products";

export interface Bill {
  sellType: "onSite" | "toGo" | "rappi" | "phone";
  user: string;
  checkTotal: string;
  products: Product[];
  status: "enabled" | "disabled" | "pending" | "cancel";
  paymentDate: string;
  tableNum: string;
}
