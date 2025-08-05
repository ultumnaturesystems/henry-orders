"use client";
import { useState } from "react";
import {
  financialStatusVariant,
  fulfillmentStatusVariant,
} from "@/utils/shopify/types";
import {
  ColumnDef,
  SortingState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { DataTablePagination } from "./data-table-pagination";
import { useRouter } from "nextjs-toploader/app";
import { Order } from "@/utils/shopify/types";
import { Badge } from "../ui/badge";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    state: {
      sorting,
    },
  });

  const handleRowClick = (row: Order) => {
    router.push(`/${row?.["id"].replace("gid://shopify/Order/", "")}`);
  };

  // Mobile card view component
  const MobileCardView = ({ row }: { row: Row<TData> }) => {
    const order = row.original as Order;
    return (
      <Card
        className="mb-4 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => handleRowClick(order)}
      >
        <CardContent className="px-4 py-2">
          <div className="flex flex-col space-y-2">
            <p className="text-xs text-muted-foreground">
              {new Date(order?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              at{" "}
              {new Date(order?.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div className="flex justify-between font-medium">
              <span>{order?.name}</span>
              <span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(order.currentTotalPriceSet?.presentmentMoney.amount)}
              </span>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                style={financialStatusVariant[order.displayFinancialStatus]}
              >
                {order.displayFinancialStatus.charAt(0).toUpperCase() +
                  order.displayFinancialStatus.slice(1).toLowerCase()}
              </Badge>
              <Badge
                variant="outline"
                style={fulfillmentStatusVariant[order.displayFulfillmentStatus]}
              >
                {order.displayFulfillmentStatus.charAt(0).toUpperCase() +
                  order.displayFulfillmentStatus.slice(1).toLowerCase()}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              {order?.customer?.firstName} {order?.customer?.lastName}
            </span>
            <span>{order.lineItems.nodes.length} Items</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden md:block rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const original: any = row.original;
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-muted cursor-pointer"
                    onClick={() => handleRowClick(original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View - Visible only on mobile */}
      <div className="block md:hidden space-y-4">
        {table.getRowModel().rows?.length ? (
          table
            .getRowModel()
            .rows.map((row) => <MobileCardView key={row.id} row={row} />)
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No results.
            </CardContent>
          </Card>
        )}
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
