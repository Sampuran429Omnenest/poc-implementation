export interface OrderFilter {
    name: string;
    type: string;
    values: string[];
}

export interface OrderSort {
    name: string;
    order: "ASC" | "DESC";
}

export interface OrdersPayload {
    filterOn: OrderFilter[];
    sortOn: OrderSort[];
}

export type TransactionType = "Buy" | "Sell";
export type OrderStatus = "rejected" | "executed" | "pending" | "cancelled"; // Add more as needed
export type BffOrderStatus = "Rejected" | "Executed" | "Pending" | "Cancelled";

export interface Order {
    scripId: string;
    transactionType: TransactionType;
    exchangeSegment: string;
    exchange: string;
    tradingSymbol: string;
    nestOrderNumber: number;
    gtcGtdTriggerId: string;
    sipSequenceNumber: string;
    sipIndicator: string;
    gtcGtdIndicator: string;
    advOrderIndicator: string;
    price: number;
    triggerPrice: number;
    totalQuantity: number;
    scripName: string;
    orderStatus: OrderStatus;
    bffOrderStatus: BffOrderStatus;
    rejectionReason: string;
    scripToken: string;
    filledQuantity: number;
    pendingQuantity: number;
    productCode: string;
    averagePrice: number;
    decimalPrecision: number;
    exchangeOrderNumber: number;
    orderedTime: string; // "DD/MM/YYYY HH:MM:SS"
    orderPriceType: string;
    orderAuthStatus: string;
    warningText: string;
    childOrders: Order[]; // define a more specific type if child orders have a structure
    lotSize: number;
    remarks: string;
    afterMarketOrderFlag: boolean;
    retentionType: string;
    segmentIndicator: string;
    isReplaceable: boolean;
    companyName: string;
    assetCode: string;
}

export interface OrderListResponse {
    orders: Order[];
    totalOrderCount: number;
}
