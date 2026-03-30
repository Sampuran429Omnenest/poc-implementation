import api from "../../api/axios";
import { getAuthHeaders } from "../../shared/utils/requestHeader";
import type { OrderListResponse, OrdersPayload } from "./types/order.type";

export const getOrderList = async (
    skip: number = 0,
    top: number = 10,
    payload: OrdersPayload = { filterOn: [], sortOn: [] },
    token: string,
) => {
    const res = await api.post<OrderListResponse>(
        "/v3/api/orders/list",
        payload,
        {
            params: { skip, top },
            headers: getAuthHeaders(token),
        },
    );
    return res.data;
};
