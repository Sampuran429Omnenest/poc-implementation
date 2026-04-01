// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useOrderHook } from "../hooks/useOrderHook";
// import { useOrderStore } from "../stores/useOrderStore";
// import { generateMockOrders } from "../../../shared/utils/mockData";
// import {
//     getCoreRowModel,
//     useReactTable,
//     flexRender,
//     type ColumnDef,
//     type SortingState,
//     getSortedRowModel,
//     //getPaginationRowModel,
// } from "@tanstack/react-table";
// // import {
// //     useVirtualizer,
// //     VirtualItem,
// //     Virtualizer,
// // } from "@tanstack/react-virtual";
// import type { Order } from "../types/order.type";
// import { ArrowUpDown, Search } from "lucide-react";
// import { useVirtualList } from "../hooks/useVirtualList";
// const ROW_HEIGHT = 72;
// type TabType = "ALL" | "OPEN" | "EXECUTED";
// export const OrderBook = () => {
//     const { loading, error, orders, getAllOrders } = useOrderHook();
//     const [sorting, setSorting] = useState<SortingState>([]);
//     const [activeTab, setActiveTab] = useState<TabType>("ALL");
//     const [dynamicRowHeight, setDynamicRowHeight] = useState(62); //set this according to the figma initially
//     // const [pagination, setPagination] = useState({
//     //     pageIndex: 0,
//     //     pageSize: 10,
//     // });

//     useEffect(() => {
//         const fetchAndMockData = async () => {
//             await getAllOrders();
//             const mockOrders = generateMockOrders(500);
//             useOrderStore.setState((state) => ({
//                 orders: [...state.orders, ...mockOrders],
//                 totalOrderCount: state.totalOrderCount + 9,
//             }));
//         };

//         fetchAndMockData();
//     }, [getAllOrders]);

//     const filteredOrders = useMemo(() => {
//         if (!orders) return [];
//         return orders.filter((order) => {
//             const status = (order as Order).bffOrderStatus || ""; 
//             if (activeTab === "OPEN") return  status === "Pending";//check this once in the api response 
//             if (activeTab === "EXECUTED") return  status === "Executed";
//             return true;
//         });
//     }, [orders, activeTab]);
    
//     const columns = useMemo<ColumnDef<Order>[]>(
//         () => [
//             { accessorKey: "tradingSymbol", header: "Scrips" },
//             { accessorKey: "exchangeSegment", header: "Exchange " },
//             {
//                 accessorKey: "transactionType",
//                 header: "Transaction",
//                 cell: (info) => {
//                     const type = info.getValue() as string;
//                     const displayText =
//                         type === "Buy" ? "Bought" : type === "Sell" ? "Sold" : type;
//                     return (
//                         <span
//                             className={`px-2 py-1 rounded-md text-xs font-medium 
//                         ${type === "Buy"
//                                     ? "bg-green-100 text-green-800"
//                                     : type === "Sell"
//                                         ? "bg-red-100 text-red-800"
//                                         : "bg-gray-100 text-gray-800"
//                                 }`}
//                         >
//                             {displayText}
//                         </span>
//                     );
//                 },
//             },
//             { accessorKey: "productCode", header: "Type" },
//             { accessorKey: "totalQuantity", header: "Qty" },
//             { accessorKey: "price", header: "Price" },
//             // {
//             //     accessorKey: "gtcGtdTriggerId",
//             //     header: "Trigger Id",
//             //     cell: (info) => info.getValue() || "-",
//             // },
//             {
//                 accessorKey: "retentionType",
//                 header: "Validity",
//                 cell: (info) => {
//                     const validity = info.getValue() as string;
//                     if (!validity) return "-";
//                     return validity.toString();
//                 },
//             },
//             // {
//             //     accessorKey: "bffOrderStatus",
//             //     header: "Status",
//             //     cell: (info) => {
//             //         const status = info.getValue() as string;
//             //         // Optional: Add some pill styling for statuses
//             //         return (
//             //             <span
//             //                 className={`text-xs font-medium
//             //             ${status === "Complete"
//             //                         ? "text-green-800"
//             //                         : status === "Rejected"
//             //                             ? "text-red-800"
//             //                             : "text-gray-800"
//             //                     }`}
//             //             >
//             //                 {status}
//             //             </span>
//             //         );
//             //     },
//             // },
//             // {
//             //     accessorKey: "rejectionReason",
//             //     header: "Rejection Reason",
//             //     cell: (info) => (
//             //         <div className="max-w-50 truncate" title={info.getValue() as string}>
//             //             {(info.getValue() as string) || "-"}
//             //         </div>
//             //     ),
//             // },

//             // { accessorKey: "exchangeOrderNumber", header: "Exchange Order No" },
//             {
//                 accessorKey: "nestOrderNumber",
//                 header: "Transaction ID",
//                 enableSorting: false,
//             },
//             // {
//             //     id: "accountId",
//             //     header: "Account Id",
//             //     cell: () => "-",
//             //     enableSorting: false,
//             // },
//             {
//                 accessorKey: "orderedTime",
//                 header: "Date & Time",
//                 cell: (info) => {
//                     const rawDate = info.getValue() as string;
//                     if (!rawDate) return "-";
//                     return rawDate.toString().replace(/,/g, " ");
//                 },
//             },
//             // {
//             //     id: "updatedTime",
//             //     header: "Updated Time",
//             //     cell: () => "-",
//             // },
//         ],
//         [],
//     );
//     const table = useReactTable({
//         data: filteredOrders,
//         columns,
//         state: {
//             sorting,
//             // pagination,
//         },
//         getCoreRowModel: getCoreRowModel(),
//         onSortingChange: setSorting,
//         // onPaginationChange: setPagination,
//         getSortedRowModel: getSortedRowModel(),
//         // getPaginationRowModel: getPaginationRowModel(),
//     });
//     const { visibleItems, containerRef, spacerAbove, spacerBelow } =
//         useVirtualList(table.getRowModel().flatRows, { //what is the difference between the usage of flat rows and rows 
//             rowHeight: dynamicRowHeight,
//             overscan: 3,
//         });
//     // 3. Callback ref to measure the DOM node height and update our state
//     const measureRowRef = useCallback((node: HTMLTableRowElement | null) => {
//         if (node !== null) {
//             const { height } = node.getBoundingClientRect();
//             if (height && height !== dynamicRowHeight) {
//                 setDynamicRowHeight(height);
//             }
//         }
//     }, [dynamicRowHeight]);

//     // const currentPage = table.getState().pagination.pageIndex;
//     // const pageCount = table.getPageCount();
//     // const startPage = Math.max(0, currentPage - 3);
//     // const endPage = Math.min(pageCount - 1, currentPage + 3);
//     // const paginationButtons = [];
//     // for (let i = startPage; i <= endPage; i++) {
//     //     paginationButtons.push(
//     //         <button
//     //             key={i}
//     //             onClick={() => table.setPageIndex(i)}
//     //             disabled={currentPage === i}
//     //             className={`px-3 py-1 rounded border transition-colors text-sm
//     //             ${currentPage === i
//     //                     ? "bg-[#ECEDEE] font-semibold border-[#DCDFE4] text-black"
//     //                     : "border-[#E3E4E5] hover:bg-gray-50 text-gray-600"
//     //                 }`}
//     //         >
//     //             {i + 1}
//     //         </button>,
//     //     );
//     // }

//     //virtualization

//     if ((loading && orders != null) || orders.length === 0)
//         return <div>Loading orders...</div>;
//     if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
//     console.log({
//   dynamicRowHeight,
//   assumed: ROW_HEIGHT,
// });
// return (
//   <div className="flex flex-col w-full h-150 bg-[#FFFFFF] rounded-lg border border-[#E3E4E5]">

//     {/* Tabs */}
//     <div className="flex items-center gap-6 px-4 py-3 border-b border-[#E3E4E5] bg-[#F9F9F9] rounded-t-lg">
//       {(["ALL", "OPEN", "EXECUTED"] as TabType[]).map((tab) => (
//         <button
//           key={tab}
//           onClick={() => setActiveTab(tab)}
//           className={`text-sm font-semibold pb-1 border-b-2 transition-colors ${
//             activeTab === tab
//               ? "border-blue-600 text-blue-600"
//               : "border-transparent text-gray-500 hover:text-gray-800"
//           }`}
//         >
//           {tab.charAt(0) + tab.slice(1).toLowerCase()} Orders
//         </button>
//       ))}
//     </div>

//     {/* Scroll Container */}
//     <div
//       ref={containerRef}
//       className="flex-1 overflow-auto w-full"
//     >

//       {/* Header (still table for alignment) */}
//       <table className="w-full border-collapse">
//         <thead className="text-[14px] bg-[#ECEDEE] sticky top-0 z-30">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header, index) => {
//                 const canSort = header.column.getCanSort();
//                 const showSearch =
//                   header.column.id === "tradingSymbol" ||
//                   header.column.id === "nestOrderNumber";

//                 return (
//                   <th
//                     key={header.id}
//                     className={`h-9 px-3 text-left border-r border-[#E3E4E5] ${
//                       index === 0
//                         ? "sticky left-0 z-40 bg-[#ECEDEE]"
//                         : ""
//                     }`}
//                   >
//                     <div
//                       className={`flex items-center justify-between ${
//                         canSort ? "cursor-pointer" : ""
//                       }`}
//                       onClick={
//                         canSort
//                           ? header.column.getToggleSortingHandler()
//                           : undefined
//                       }
//                     >
//                       <span>
//                         {flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                       </span>

//                       <div className="flex items-center gap-1">
//                         {showSearch && <Search className="w-3.5 h-3.5" />}
//                         {canSort && <ArrowUpDown className="w-4 h-4" />}
//                       </div>
//                     </div>
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//       </table>

//       {/* 🔥 Virtualized Body (DIV BASED) */}
//       <div className="relative w-full">

//         {/* Spacer Above */}
//         <div style={{ height: spacerAbove }} />

//         {/* Rows */}
//         {visibleItems.map((row, index) => (
//           <div
//             key={row.id}
//             ref={index === 0 ? measureRowRef : null}
//             className="flex border-b border-[#E3E4E5] odd:bg-white even:bg-[#F9F9F9]"
//             style={{ minHeight: dynamicRowHeight }}
//           >
//             {row.getVisibleCells().map((cell, cellIndex) => (
//               <div
//                 key={cell.id}
//                 className={`px-3 py-3 text-[14px] flex-1 whitespace-nowrap ${
//                   cellIndex === 0
//                     ? "sticky left-0 bg-inherit z-10 shadow-[1px_0_0_#e5e7eb]"
//                     : ""
//                 }`}
//               >
//                 {flexRender(
//                   cell.column.columnDef.cell,
//                   cell.getContext()
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}

//         {/* Spacer Below */}
//         <div style={{ height: spacerBelow }} />

//       </div>
//     </div>
//   </div>
// );
//     // return (
//     //     <div className="flex flex-col w-full h-full p-4 gap-2.5 bg-[#FFFFFF] rounded-b-lg border border-[#E3E4E5]">
//     //         <div style={{ height: spacerAbove }} />
//     //         <div
//     //             ref={containerRef}
//     //             className="flex-1 overflow-auto w-full [&::-webkit-scrollbar:vertical]:hidden"
//     //         >
//     //             <table className="w-full text-left text-[#2A2A2B] border-collapse">
//     //                 <thead className="text-[14px] bg-[#ECEDEE] sticky top-0 z-30">
//     //                     {table.getHeaderGroups().map((headerGroup) => (
//     //                         <tr key={headerGroup.id}>
//     //                             {headerGroup.headers.map((header, index) => {
//     //                                 const columnId = header.column.id;
//     //                                 const showSearch =
//     //                                     columnId === "tradingSymbol" ||
//     //                                     columnId === "nestOrderNumber";
//     //                                 const canSort = header.column.getCanSort();
//     //                                 return (
//     //                                     <th
//     //                                         key={header.id}
//     //                                         className={`h-9 px-2 whitespace-nowrap border-r border-[#E3E4E5] last:border-r-0
//     //                                         ${index === 0
//     //                                                 ? "sticky left-0 z-40 bg-[#ECEDEE] shadow-[1px_0_0_#e5e7eb]"
//     //                                                 : ""
//     //                                             }`}
//     //                                     >
//     //                                         <div
//     //                                             className={`flex items-center justify-between gap-2 select-none ${canSort ? "cursor-pointer" : "cursor-default"
//     //                                                 }`}
//     //                                             onClick={
//     //                                                 canSort
//     //                                                     ? header.column.getToggleSortingHandler()
//     //                                                     : undefined
//     //                                             }
//     //                                         >
//     //                                             <span className="truncate">
//     //                                                 {flexRender(
//     //                                                     header.column.columnDef.header,
//     //                                                     header.getContext(),
//     //                                                 )}
//     //                                             </span>

//     //                                             <div className="flex items-center gap-1.5 shrink-0">
//     //                                                 {showSearch && (
//     //                                                     <Search className="w-3.5 h-3.5 text-[#555555]" />
//     //                                                 )}
//     //                                                 {canSort && (
//     //                                                     <ArrowUpDown className="w-4 h-4 text-[#555555]" />
//     //                                                 )}
//     //                                             </div>
//     //                                         </div>
//     //                                     </th>
//     //                                 );
//     //                             })}
//     //                         </tr>
//     //                     ))}
//     //                 </thead>

//     //                 <tbody>
//     //                     {table.getRowModel().rows.map((row) => (
//     //                         <tr
//     //                             key={row.id}
//     //                             className="h-11 odd:bg-[#FFFFFF] even:bg-[#F9F9F9] hover:bg-gray-50"
//     //                         >
//     //                             {row.getVisibleCells().map((cell, index) => (
//     //                                 <td
//     //                                     key={cell.id}
//     //                                     className={`px-3 text-[14px] font-normal whitespace-nowrap 
//     //                                     ${index === 0
//     //                                             ? "sticky left-0 z-20 shadow-[1px_0_0_#e5e7eb] bg-inherit"
//     //                                             : ""
//     //                                         }`}
//     //                                 >
//     //                                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//     //                                 </td>
//     //                             ))}
//     //                         </tr>
//     //                     ))}
//     //                 </tbody>
//     //             </table>
//     //         </div>

//     //         <div className="flex items-center justify-between px-4 py-3 border-t border-[#E3E4E5] bg-white rounded-b-lg">
//     //             <div className="flex items-center gap-2 text-sm text-[#2A2A2B]">
//     //                 <span>Rows per page:</span>
//     //                 <select
//     //                     value={table.getState().pagination.pageSize}
//     //                     onChange={(e) => {
//     //                         table.setPageSize(Number(e.target.value));
//     //                     }}
//     //                     className="border border-[#E3E4E5] rounded p-1 outline-none bg-transparent cursor-pointer"
//     //                 >
//     //                     {[10, 20, 30, 40, 50].map((pageSize) => (
//     //                         <option key={pageSize} value={pageSize}>
//     //                             {pageSize}
//     //                         </option>
//     //                     ))}
//     //                 </select>
//     //             </div>

//     //             <div className="flex items-center gap-6 text-sm text-[#2A2A2B]">
//     //                 <span>
//     //                     Page <strong>{currentPage + 1}</strong> of{" "}
//     //                     <strong>{pageCount}</strong>
//     //                 </span>

//     //                 <div className="flex items-center gap-1">{paginationButtons}</div>

//     //                 <div className="flex items-center gap-1 border-l border-gray-300 pl-4 ml-2">
//     //                     <button
//     //                         onClick={() => table.firstPage()}
//     //                         disabled={!table.getCanPreviousPage()}
//     //                         className="px-2 py-1 rounded border border-[#E3E4E5] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//     //                     >
//     //                         {"<<"}
//     //                     </button>

//     //                     <button
//     //                         onClick={() => table.previousPage()}
//     //                         disabled={!table.getCanPreviousPage()}
//     //                         className="px-2 py-1 rounded border border-[#E3E4E5] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//     //                     >
//     //                         {"<"}
//     //                     </button>
//     //                     <button
//     //                         onClick={() => table.nextPage()}
//     //                         disabled={!table.getCanNextPage()}
//     //                         className="px-2 py-1 rounded border border-[#E3E4E5] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//     //                     >
//     //                         {">"}
//     //                     </button>
//     //                     <button
//     //                         onClick={() => table.lastPage()}
//     //                         disabled={!table.getCanNextPage()}
//     //                         className="px-2 py-1 rounded border border-[#E3E4E5] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
//     //                     >
//     //                         {">>"}
//     //                     </button>
//     //                 </div>
//     //             </div>
//     //         </div>
//     //         <div style={{ height: spacerBelow }} />
//     //     </div>
//     // );
// };


import { useCallback, useEffect, useMemo, useState } from "react";
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
} from "@tanstack/react-table";
import type { Order } from "../types/order.type";
import { ArrowUpDown } from "lucide-react";
import { useVirtualList } from "../hooks/useVirtualList";

type TabType = "ALL" | "OPEN" | "EXECUTED";

export const OrderBook = () => {
  const { loading, error, orders, getAllOrders } = useOrderHook();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [dynamicRowHeight, setDynamicRowHeight] = useState(60);

  useEffect(() => {
    const fetchAndMockData = async () => {
      await getAllOrders();
      const mockOrders = generateMockOrders(500);
      useOrderStore.setState((state) => ({
        orders: [...state.orders, ...mockOrders],
      }));
    };

    fetchAndMockData();
  }, [getAllOrders]);

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    return orders.filter((order) => {
      const status = (order as Order).bffOrderStatus || "";
      if (activeTab === "OPEN") return status === "Pending";
      if (activeTab === "EXECUTED") return status === "Executed";
      return true;
    });
  }, [orders, activeTab]);

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      { accessorKey: "tradingSymbol", header: "Scrips" },
      { accessorKey: "exchangeSegment", header: "Exchange" },
      {
        accessorKey: "transactionType",
        header: "Transaction",
        cell: (info) => {
          const type = info.getValue() as string;
          const displayText =
            type === "Buy"
              ? "Bought"
              : type === "Sell"
              ? "Sold"
              : type;

          return (
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                type === "Buy"
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
      { accessorKey: "retentionType", header: "Validity" },
      {
        accessorKey: "nestOrderNumber",
        header: "Transaction ID",
        enableSorting: false,
      },
      {
        accessorKey: "orderedTime",
        header: "Date & Time",
        cell: (info) => {
          const rawDate = info.getValue() as string;
          return rawDate?.replace(/,/g, " ") || "-";
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredOrders,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

  const { visibleItems, containerRef, spacerAbove, spacerBelow } =
    useVirtualList(table.getRowModel().flatRows, {
      rowHeight: dynamicRowHeight,
      overscan: 5,
    });

  const measureRowRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        const height = node.getBoundingClientRect().height;
        if (height && height !== dynamicRowHeight) {
          setDynamicRowHeight(height);
        }
      }
    },
    [dynamicRowHeight]
  );

  if (loading || orders.length === 0) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="flex flex-col w-full h-[600px] bg-white rounded-lg border">

      {/* Tabs */}
      <div className="flex gap-6 px-4 py-3 border-b bg-gray-50">
        {(["ALL", "OPEN", "EXECUTED"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-semibold pb-1 border-b-2 ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab} Orders
          </button>
        ))}
      </div>

      {/* Scroll Container */}
      <div ref={containerRef} className="flex-1 overflow-auto">

        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#ECEDEE] flex text-sm border-b">
          {table.getFlatHeaders().map((header, i) => (
            <div
              key={header.id}
              className={`px-3 py-2 flex-1 border-r ${
                i === 0 ? "sticky left-0 bg-[#ECEDEE] z-30" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                <ArrowUpDown className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        {/* Virtualized Body */}
        <div>

          <div style={{ height: spacerAbove }} />

          {visibleItems.map((row, index) => (
            <div
              key={row.id}
              ref={index === 0 ? measureRowRef : null}
              className="flex border-b odd:bg-white even:bg-gray-50"
            >
              {row.getVisibleCells().map((cell, i) => (
                <div
                  key={cell.id}
                  className={`px-3 py-3 flex-1 ${
                    i === 0
                      ? "sticky left-0 bg-inherit z-10 border-r"
                      : ""
                  }`}
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </div>
              ))}
            </div>
          ))}

          <div style={{ height: spacerBelow }} />

        </div>
      </div>
    </div>
  );
};