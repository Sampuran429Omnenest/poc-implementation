import type {
    BffOrderStatus,
    Order,
    OrderStatus,
    TransactionType,
} from "../../features/orders/types/order.type";

export const generateMockOrders = (count: number): Order[] => {
    const transactionTypes: TransactionType[] = ["Buy", "Sell"];
    const statuses: OrderStatus[] = [
        "rejected",
        "executed",
        "pending",
        "cancelled",
    ];
    const bffStatuses: BffOrderStatus[] = [
        "Rejected",
        "Executed",
        "Pending",
        "Cancelled",
    ];
    const symbols = ["RELIANCE", "TCS", "INFY", "HDFCBANK", "SBIN"];
    const exchanges = ["NSE", "BSE"];

    return Array.from({ length: count }).map((_, index) => {
        const type =
            transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
        const statusIndex = Math.floor(Math.random() * statuses.length);
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const price = parseFloat((Math.random() * 3000 + 100).toFixed(2));
        const qty = Math.floor(Math.random() * 100) + 1;

        return {
            scripId: `1000${Math.floor(Math.random() * 9999)}`,
            transactionType: type,
            exchangeSegment: "CM",
            exchange: exchanges[Math.floor(Math.random() * exchanges.length)],
            tradingSymbol: symbol,
            nestOrderNumber: Math.floor(Math.random() * 100000000),
            gtcGtdTriggerId: "",
            sipSequenceNumber: "",
            sipIndicator: "N",
            gtcGtdIndicator: "N",
            advOrderIndicator: "N",
            price: price,
            triggerPrice: 0,
            totalQuantity: qty,
            scripName: `${symbol} EQ`,
            orderStatus: statuses[statusIndex],
            bffOrderStatus: bffStatuses[statusIndex],
            rejectionReason:
                statuses[statusIndex] === "rejected" ? "Insufficient funds" : "",
            scripToken: `TKN${index}`,
            filledQuantity: statuses[statusIndex] === "executed" ? qty : 0,
            pendingQuantity: statuses[statusIndex] === "pending" ? qty : 0,
            productCode: "CNC",
            averagePrice: statuses[statusIndex] === "executed" ? price : 0,
            decimalPrecision: 2,
            exchangeOrderNumber: Math.floor(Math.random() * 1000000000),
            orderedTime: new Date(
                Date.now() - Math.random() * 10000000000,
            ).toLocaleString("en-GB"),
            orderPriceType: "LIMIT",
            orderAuthStatus: "Approved",
            warningText: "",
            childOrders: [],
            lotSize: 1,
            remarks: "Mock order",
            afterMarketOrderFlag: Math.random() > 0.8,
            retentionType: "DAY",
            segmentIndicator: "EQ",
            isReplaceable: statuses[statusIndex] === "pending",
            companyName: `${symbol} Limited`,
            assetCode: "EQ",
        };
    });
};
