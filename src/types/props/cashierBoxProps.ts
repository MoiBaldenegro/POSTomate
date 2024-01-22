import { Bill } from "../account"

export interface CashierBoxProps {
    openModal: () => void;
    item: Bill;
    route: string;
}