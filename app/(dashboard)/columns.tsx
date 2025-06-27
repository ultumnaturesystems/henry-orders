"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import {
  Order,
  financialStatusVariant,
  fulfillmentStatusVariant,
} from "@/utils/shopify/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Order>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created At" />;
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original.customer;
      return (
        <div>
          {customer.firstName} {customer.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "currentTotalPriceSet",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Total Price" />;
    },
    cell: ({ row }) => {
      const { amount, currencyCode } =
        row.original.currentTotalPriceSet.presentmentMoney;

      return (
        <div>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currencyCode,
          }).format(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "displayFinancialStatus",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Financial Status" />;
    },
    cell: ({ row }) => {
      const status = row.original.displayFinancialStatus;

      return (
        <div>
          <Badge variant={"secondary"} style={financialStatusVariant[status]}>
            {financialStatusVariant[status]?.label || status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "displayFulfillmentStatus",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Fulfillment Status" />
      );
    },
    cell: ({ row }) => {
      const fulfillmentStatus = row.original.displayFulfillmentStatus;
      return (
        <div>
          <Badge
            variant={"secondary"}
            style={fulfillmentStatusVariant[fulfillmentStatus]}
          >
            {fulfillmentStatusVariant[fulfillmentStatus]?.label ||
              fulfillmentStatus}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "lineItems",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Items" />;
    },
    cell: ({ row }) => {
      const lineItems = row.original.lineItems.nodes.length;
      return (
        <div>
          {lineItems} item{lineItems !== 1 ? "s" : ""}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "tags",
  //   header: "Tags",
  //   cell: ({ row }) => {
  //     const tags = row.original.tags;
  //     return (
  //       <div>
  //         {tags.length > 0 ? (
  //           tags.map((tag, index) => (
  //             <Badge key={index} className="mr-1" variant="secondary">
  //               {tag}
  //             </Badge>
  //           ))
  //         ) : (
  //           <span>No Tags</span>
  //         )}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "note",
  //   header: "Note",
  // },
];
