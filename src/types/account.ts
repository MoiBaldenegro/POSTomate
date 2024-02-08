import { Product } from "./products";

export interface Printer {
  printerName: string;
  tcp: string;
}

export interface Bill {
  sellType: "onSite" | "toGo" | "rappi" | "phone";
  user: string;
  checkTotal: string;
  products: Product[];
  status: "enable" | "free" | "forPayment" | "pending";
  paymentDate: string;
  tableNum: string;
  table: string | undefined;
  printerLocation?: Printer[];
}
