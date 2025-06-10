import { fetchOrders } from "./actions";
import { columns, Order } from "./columns";
import { DataTable } from "./data-table";

const OrdersPage = async () => {
  const orders: Order[] = await fetchOrders();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={orders} />
    </div>
  );
};

export default OrdersPage;
