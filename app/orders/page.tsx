import { fetchOrders } from "./actions";
import { Order } from "@/utils/shopify/types";
import Orders from "./Orders";

const OrdersPage = async () => {
  const orders: Order[] = await fetchOrders();

  return (
    <div className="container mx-auto py-10">
      <Orders orders={orders} />
    </div>
  );
};

export default OrdersPage;
