import { useEffect, useMemo, useState } from "react";
import { useOrderHook } from "../hooks/useOrderHook";
import { useOrderStore } from "../stores/useOrderStore";
import { generateMockOrders } from "../../../shared/utils/mockData";
import {
    getCoreRowModel,
    useReactTable,
    flexRender,
    type ColumnDef,
    type SortingState,
    getSortedRowModel,
    getPaginationRowModel,
} from "@tanstack/react-table";
// import {
//     useVirtualizer,
//     VirtualItem,
//     Virtualizer,
// } from "@tanstack/react-virtual";
import type { Order } from "../types/order.type";
import { ArrowUpDown, Search } from "lucide-react";
import { useVirtualList } from "../hooks/useVirtualList";
const ROW_HEIGHT = 62;
export const OrderBook = () => {
    const { loading, error, orders, getAllOrders } = useOrderHook();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        const fetchAndMockData = async () => {
            await getAllOrders();
            const mockOrders = generateMockOrders(500);
            useOrderStore.setState((state) => ({
                orders: [...state.orders, ...mockOrders],
                totalOrderCount: state.totalOrderCount + 9,
            }));
        };

        fetchAndMockData();
    }, [getAllOrders]);

    const columns = useMemo<ColumnDef<Order>[]>(
        () => [
            { accessorKey: "tradingSymbol", header: "Scrips" },
            { accessorKey: "exchangeSegment", header: "Exchange " },
            {
                accessorKey: "transactionType",
                header: "Transaction",
                cell: (info) => {
                    const type = info.getValue() as string;
                    const displayText =
                        type === "Buy" ? "Bought" : type === "Sell" ? "Sold" : type;
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
                            {displayText}
                        </span>
                    );
                },
            },
            { accessorKey: "productCode", header: "Type" },
            { accessorKey: "totalQuantity", header: "Qty" },
            { accessorKey: "price", header: "Price" },
            // {
            //     accessorKey: "gtcGtdTriggerId",
            //     header: "Trigger Id",
            //     cell: (info) => info.getValue() || "-",
            // },
            {
                accessorKey: "retentionType",
                header: "Validity",
                cell: (info) => {
                    const validity = info.getValue() as string;
                    if (!validity) return "-";
                    return validity.toString();
                },
            },
            // {
            //     accessorKey: "bffOrderStatus",
            //     header: "Status",
            //     cell: (info) => {
            //         const status = info.getValue() as string;
            //         // Optional: Add some pill styling for statuses
            //         return (
            //             <span
            //                 className={`text-xs font-medium
            //             ${status === "Complete"
            //                         ? "text-green-800"
            //                         : status === "Rejected"
            //                             ? "text-red-800"
            //                             : "text-gray-800"
            //                     }`}
            //             >
            //                 {status}
            //             </span>
            //         );
            //     },
            // },
            // {
            //     accessorKey: "rejectionReason",
            //     header: "Rejection Reason",
            //     cell: (info) => (
            //         <div className="max-w-50 truncate" title={info.getValue() as string}>
            //             {(info.getValue() as string) || "-"}
            //         </div>
            //     ),
            // },

            // { accessorKey: "exchangeOrderNumber", header: "Exchange Order No" },
            {
                accessorKey: "nestOrderNumber",
                header: "Transaction ID",
                enableSorting: false,
            },
            // {
            //     id: "accountId",
            //     header: "Account Id",
            //     cell: () => "-",
            //     enableSorting: false,
            // },
            {
                accessorKey: "orderedTime",
                header: "Date & Time",
                cell: (info) => {
                    const rawDate = info.getValue() as string;
                    if (!rawDate) return "-";
                    return rawDate.toString().replace(/,/g, " ");
                },
            },
            // {
            //     id: "updatedTime",
            //     header: "Updated Time",
            //     cell: () => "-",
            // },
        ],
        [],
    );
    const table = useReactTable({
        data: orders,
        columns,
        state: {
            sorting,
            pagination,
        },
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    const { visibleItems, containerRef, spacerAbove, spacerBelow } =
        useVirtualList(table, {
            rowHeight: ROW_HEIGHT,
            overscan: 3,
        });
    const currentPage = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();
    const startPage = Math.max(0, currentPage - 3);
    const endPage = Math.min(pageCount - 1, currentPage + 3);
    const paginationButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        paginationButtons.push(
            <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                disabled={currentPage === i}
                className={`px-3 py-1 rounded border transition-colors text-sm
                ${currentPage === i
                        ? "bg-[#ECEDEE] font-semibold border-[#DCDFE4] text-black"
                        : "border-[#E3E4E5] hover:bg-gray-50 text-gray-600"
                    }`}
            >
                {i + 1}
            </button>,
        );
    }

    //virtualization

    if ((loading && orders != null) || orders.length === 0)
        return <div>Loading orders...</div>;
    if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
    return (
        <div className="flex flex-col w-full h-full p-4 gap-2.5 bg-[#FFFFFF] rounded-b-lg border border-[#E3E4E5]">
            <div style={{ height: spacerAbove }} />
            <div
                ref={containerRef}
                className="flex-1 overflow-auto w-full [&::-webkit-scrollbar:vertical]:hidden"
            >
                <table className="w-full text-left text-[#2A2A2B] border-collapse">
                    <thead className="text-[14px] bg-[#ECEDEE] sticky top-0 z-30">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header, index) => {
                                    const columnId = header.column.id;
                                    const showSearch =
                                        columnId === "tradingSymbol" ||
                                        columnId === "nestOrderNumber";
                                    const canSort = header.column.getCanSort();
                                    return (
                                        <th
                                            key={header.id}
                                            className={`h-9 px-2 whitespace-nowrap border-r border-[#E3E4E5] last:border-r-0
                                            ${index === 0
                                                    ? "sticky left-0 z-40 bg-[#ECEDEE] shadow-[1px_0_0_#e5e7eb]"
                                                    : ""
                                                }`}
                                        >
                                            <div
                                                className={`flex items-center justify-between gap-2 select-none ${canSort ? "cursor-pointer" : "cursor-default"
                                                    }`}
                                                onClick={
                                                    canSort
                                                        ? header.column.getToggleSortingHandler()
                                                        : undefined
                                                }
                                            >
                                                <span className="truncate">
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                                </span>

                                                <div className="flex items-center gap-1.5 shrink-0">
                                                    {showSearch && (
                                                        <Search className="w-3.5 h-3.5 text-[#555555]" />
                                                    )}
                                                    {canSort && (
                                                        <ArrowUpDown className="w-4 h-4 text-[#555555]" />
                                                    )}
                                                </div>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="h-11 odd:bg-[#FFFFFF] even:bg-[#F9F9F9] hover:bg-gray-50"
                            >
                                {row.getVisibleCells().map((cell, index) => (
                                    <td
                                        key={cell.id}
                                        className={`px-3 text-[14px] font-normal whitespace-nowrap 
                                        ${index === 0
                                                ? "sticky left-0 z-20 shadow-[1px_0_0_#e5e7eb] bg-inherit"
                                                : ""
                                            }`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-[#E3E4E5] bg-white rounded-b-lg">
                <div className="flex items-center gap-2 text-sm text-[#2A2A2B]">
                    <span>Rows per page:</span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="border border-[#E3E4E5] rounded p-1 outline-none bg-transparent cursor-pointer"
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-6 text-sm text-[#2A2A2B]">
                    <span>
                        Page <strong>{currentPage + 1}</strong> of{" "}
                        <strong>{pageCount}</strong>
                    </span>

                    <div className="flex items-center gap-1">{paginationButtons}</div>

                    <div className="flex items-center gap-1 border-l border-gray-300 pl-4 ml-2">
                        <button
                            onClick={() => table.firstPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="px-2 py-1 rounded border border-[#E3E4E5] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            {"<<"}
                        </button>

                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="px-2 py-1 rounded border border-[#E3E4E5] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            {"<"}
                        </button>
                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="px-2 py-1 rounded border border-[#E3E4E5] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            {">"}
                        </button>
                        <button
                            onClick={() => table.lastPage()}
                            disabled={!table.getCanNextPage()}
                            className="px-2 py-1 rounded border border-[#E3E4E5] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                            {">>"}
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ height: spacerBelow }} />
        </div>
    );
};
