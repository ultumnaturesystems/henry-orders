"use client";

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
    header: "Name",
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
    header: "Created At",
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
    header: "Total Price",
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
    header: "Financial Status",
    cell: ({ row }) => {
      const status = row.original.displayFinancialStatus;
      return <div>{status}</div>;
    },
  },
  {
    accessorKey: "displayFulfillmentStatus",
    header: "Fulfillment Status",
    cell: ({ row }) => {
      const status = row.original.displayFulfillmentStatus;
      return <div>{status}</div>;
    },
  },
  {
    accessorKey: "lineItems",
    header: "Items",
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
    accessorKey: "note",
    header: "Note",
  },
];
