import { create } from "zustand";
import type { Order } from "../types/order.type";

interface OrderState {
    orders: Order[];
    totalOrderCount: number;
    setOrderData: (orderData: Order[], totalOrderCount: number) => void;
    clearData: () => void;
}
const initialState = {
    orders: [],
    totalOrderCount: 0,
};
export const useOrderStore = create<OrderState>((set) => ({
    ...initialState,
    setOrderData: (orders: Order[], totalOrderCount: number) =>
        set({ orders, totalOrderCount }),
    clearData: () => set(initialState),
}));
