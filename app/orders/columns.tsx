"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string;
  name: string;
  note: string;
  createdAt: string;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
  };
  currentTotalPriceSet: {
    presentmentMoney: {
      amount: number;
      currencyCode: string;
    };
  };
  displayFinancialStatus:
    | "AUTHORIZED"
    | "PAID"
    | "PARTIALLY_PAID"
    | "PARTIALLY_REFUNDED"
    | "PENDING"
    | "REFUNDED"
    | "VOIDED";
  displayFulfillmentStatus:
    | "FULFILLED"
    | "IN_PROGRESS"
    | "ON_HOLD"
    | "OPEN"
    | "PARTIALLY_FULFILLED"
    | "PENDING_FULFILLMENT"
    | "REQUEST_DECLINED"
    | "RESTOCKED"
    | "SCHEDULED"
    | "UNFULFILLED";
  lineItems: {
    edges: {
      node: {
        id: string;
        name: string;
      };
    }[];
  };
  tags: string[];
};

export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ cell, row }) => {
      const orderId = row.original.id.replace("gid://shopify/Order/", "");
      return (
        <div>
          <Link
            href={`https://admin.shopify.com/store/ultumnaturesystems/orders/${orderId}`}
            target="_blank"
            style={{ textDecoration: "underline", color: "black" }}
          >
            {cell.getValue<string>()}
          </Link>
        </div>
      );
    },
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

      // Map status to shadcn badge variants
      const statusVariant: Record<
        string,
        { label: string; backgroundColor: string }
      > = {
        PAID: { label: "Paid", backgroundColor: "" },
        PARTIALLY_PAID: {
          label: "Partially Paid",
          backgroundColor: "rgba(255, 214, 164, 1)",
        },
        AUTHORIZED: {
          label: "Authorized",
          backgroundColor: "rgba(255, 235, 120, 1)",
        },
        PENDING: {
          label: "Payment Pending",
          backgroundColor: "rgba(255, 214, 164, 1)",
        },
        PARTIALLY_REFUNDED: {
          label: "Partially Refunded",
          backgroundColor: "",
        },
        REFUNDED: { label: "Refunded", backgroundColor: "" },
        VOIDED: { label: "Voided", backgroundColor: "" },
      };

      return (
        <div>
          <Badge variant={"secondary"} style={statusVariant[status]}>
            {statusVariant[status]?.label || status}
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
      const fulfillmentStatusVariant: Record<
        typeof fulfillmentStatus,
        { label: string; backgroundColor: string }
      > = {
        FULFILLED: { label: "Fulfilled", backgroundColor: "" },
        PARTIALLY_FULFILLED: {
          label: "Partially Fulfilled",
          backgroundColor: "rgba(255, 214, 164, 1)",
        },
        UNFULFILLED: {
          label: "Unfulfilled",
          backgroundColor: "rgba(255, 235, 120, 1)",
        },
        SCHEDULED: {
          label: "Scheduled",
          backgroundColor: "",
        },
        ON_HOLD: {
          label: "On Hold",
          backgroundColor: "",
        },
        RESTOCKED: { label: "Restocked", backgroundColor: "" },
        REQUEST_DECLINED: { label: "Request Declined", backgroundColor: "" },
        PENDING_FULFILLMENT: {
          label: "Pending Fulfillment",
          backgroundColor: "",
        },
        IN_PROGRESS: {
          label: "In Progress",
          backgroundColor: "",
        },
        OPEN: {
          label: "Open",
          backgroundColor: "",
        },
      };
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
      const lineItems = row.original.lineItems.edges.length;
      return (
        <div>
          {lineItems} item{lineItems !== 1 ? "s" : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.original.tags;
      return (
        <div>
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <Badge key={index} className="mr-1" variant="secondary">
                {tag}
              </Badge>
            ))
          ) : (
            <span>No Tags</span>
          )}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "note",
  //   header: "Note",
  // },
];
