import { useCallback, useState } from "react";
import { useOrderStore } from "../stores/useOrderStore";
import type { OrdersPayload } from "../types/order.type";
import { useAuthStore } from "../../../store/useAuthStore";
import { parseApiError } from "../../../shared/utils/parseApiError";
import { getOrderList } from "../order.api";

export const useOrderHook = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { orders, totalOrderCount, setOrderData, clearData } = useOrderStore();
    const { accessToken } = useAuthStore();

    const getAllOrders = useCallback(
        async (
            skip: number = 0,
            top: number = 10,
            payload: OrdersPayload = { filterOn: [], sortOn: [] },
        ) => {
            if (!accessToken) {
                setError("No access token found");
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const data = await getOrderList(skip, top, payload, accessToken);
                setOrderData(data.orders, data.totalOrderCount);
            } catch (err) {
                const { message } = parseApiError(err);
                setError(message);
                console.log(message);
            } finally {
                setLoading(false);
            }
        },
        [accessToken, setOrderData],
    );
    return {
        loading,
        error,
        orders,
        totalOrderCount,
        getAllOrders,
        clearData,
    };
};
