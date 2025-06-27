"use client";

import { DataTable } from "@/components/data-table/data-table";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { Order } from "@/utils/shopify/types";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

interface OrdersProps {
  orders: Order[];
}

const Orders = ({ orders }: OrdersProps) => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 300);

  const filteredOrders = useMemo(() => {
    const searchLower = debouncedSearch.trim().toLowerCase();
    if (!searchLower) return orders;
    return orders.filter(
      (order) =>
        order.name.toLowerCase().includes(searchLower) ||
        order.customer.firstName.toLowerCase().includes(searchLower) ||
        order.customer.lastName.toLowerCase().includes(searchLower)
    );
  }, [orders, debouncedSearch]);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search orders..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="mb-2 bg-white"
      />
      <DataTable data={filteredOrders} columns={columns} />
    </div>
  );
};

export default Orders;
