import { fetchOrders } from "./actions";
import { Order } from "@/utils/shopify/types";
import Orders from "./Orders";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const OrdersPage = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const orders: Order[] = await fetchOrders();

  return (
    <div className="container mx-auto py-10">
      <Orders
        orders={orders.filter((order) => {
          const discountSet = new Set(
            order.discountApplications.nodes.map((d) => d.targetSelection)
          );
          return discountSet.size >= 1;
        })}
      />
    </div>
  );
};

export default OrdersPage;
