import { Product } from "./products";

export interface Bill {
    billCode: string;
    sellType: 'onSite' | 'toGo' | 'rappi' | 'phone';
    user: string;
    checkTotal: string;
    products: Product[],
    status: 'enabled' | 'disabled' | 'pending' | 'cancel';
    paymentDate: string;
    tableNum: string
}