import { useEffect, useMemo } from "react";
import { useOrderHook } from "../hooks/useOrderHook";
import { useOrderStore } from "../stores/useOrderStore";
import { generateMockOrders } from "../../../shared/utils/mockData";
import {
    getCoreRowModel,
    useReactTable,
    flexRender,
    type ColumnDef,
} from "@tanstack/react-table";
import type { Order } from "../types/order.type";

export const OrderBook = () => {
    const { loading, error, orders, getAllOrders } = useOrderHook();

    useEffect(() => {
        // Step 1: Fetch the real data (even if it's just 1 order)
        const fetchAndMockData = async () => {
            await getAllOrders();

            // Step 2: Inject mock data for UI development
            // (Remove this chunk once the backend is returning full lists)
            const mockOrders = generateMockOrders(90); // Generate 9 fake orders

            // Grab current orders from store (the 1 real one) and combine with 9 mock ones
            useOrderStore.setState((state) => ({
                orders: [...state.orders, ...mockOrders],
                totalOrderCount: state.totalOrderCount + 9,
            }));
        };

        fetchAndMockData();
    }, [getAllOrders]);

    const columns = useMemo<ColumnDef<Order>[]>(
        () => [
            { accessorKey: "tradingSymbol", header: "Trading Symbol" },
            { accessorKey: "exchangeSegment", header: "Exchange Seq" },
            {
                accessorKey: "transactionType",
                header: "Buy/Sell",
                cell: (info) => {
                    const type = info.getValue() as string;
                    return (
                        <span
                            className={`px-2 py-1 rounded-md text-xs font-medium 
                        ${type === "Buy"
                                    ? "bg-green-100 text-green-800"
                                    : type === "Sell"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                        >
                            {type}
                        </span>
                    );
                },
            },
            { accessorKey: "productCode", header: "Product Type" },
            { accessorKey: "orderPriceType", header: "Order Type" },
            {
                id: "quantity",
                header: "Total Qty",
                cell: (info) =>
                    `${info.row.original.filledQuantity} / ${info.row.original.totalQuantity}`,
            },
            { accessorKey: "price", header: "Price" },
            {
                id: "netChange",
                header: "Net Change",
                cell: () => "-",
            },
            { accessorKey: "triggerPrice", header: "Trigger Price" },
            {
                accessorKey: "gtcGtdTriggerId",
                header: "Trigger Id",
                cell: (info) => info.getValue() || "-",
            },
            { accessorKey: "retentionType", header: "Validity" },
            {
                accessorKey: "bffOrderStatus",
                header: "Order Status",
                cell: (info) => {
                    const status = info.getValue() as string;
                    // Optional: Add some pill styling for statuses
                    return (
                        <span
                            className={`px-2 py-1 rounded-md text-xs font-medium 
                        ${status === "Executed"
                                    ? "bg-green-100 text-green-800"
                                    : status === "Rejected"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                        >
                            {status}
                        </span>
                    );
                },
            },
            {
                accessorKey: "rejectionReason",
                header: "Rejection Reason",
                cell: (info) => (
                    <div className="max-w-50 truncate" title={info.getValue() as string}>
                        {(info.getValue() as string) || "-"}
                    </div>
                ),
            },
            { accessorKey: "orderedTime", header: "Nest Update Time" },
            { accessorKey: "exchangeOrderNumber", header: "Exchange Order No" },
            { accessorKey: "nestOrderNumber", header: "Nest Order No" },
            {
                id: "accountId",
                header: "Account Id",
                cell: () => "-",
            },
            {
                id: "expiryDate",
                header: "Expiry Date",
                cell: () => "-",
            },
            {
                id: "percentChange",
                header: "Percent Change",
                cell: () => "-",
            },
            {
                id: "updatedTime",
                header: "Updated Time",
                cell: () => "-",
            },
        ],
        [],
    );
    const table = useReactTable({
        data: orders,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    if (loading && orders.length === 0) return <div>Loading orders...</div>;
    if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
    return (
        <div className="bg-white rounded-lg border-gray-200">
            <div className="flex items-center justify-between"></div>
            <div className="overflow-x-auto rounded-md border border-gray-200">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 border-b border-blue-600">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => (
                                    <th
                                        key={header.id}
                                        className={`px-4 py-3 font-semibold whitespace-nowrap
                                            ${index === 0 ? "sticky left-0 z-20 bg-gray-200 shadow-[1px_0_0_#e5e7eb]" : ""}
                                        `}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b border-blue-600 bg-gray-200 transition-colors"
                            >
                                {row.getVisibleCells().map((cell, index) => (
                                    <td
                                        key={cell.id}
                                        className={`px-4 py-3 font-semibold whitespace-nowrap
                                            ${index === 0 ? "sticky left-0 z-20 bg-gray-200 shadow-[1px_0_0_#e5e7eb]" : ""}
                                        `}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && !loading && (
                    <div className="p-10 text-center text-gray-500">No orders found.</div>
                )}
            </div>
        </div>
    );
};
