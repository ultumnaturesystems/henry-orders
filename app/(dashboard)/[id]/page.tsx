import { Badge } from "@/components/ui/badge";
import { fetchOrderById } from "@/utils/shopify/orders";
import { ChevronRight, Inbox as InboxIcon } from "lucide-react";
import {
  financialStatusVariant,
  fulfillmentStatusVariant,
} from "@/utils/shopify/types";
import CustomerCard from "./CustomerCard";
import NotesCard from "./NotesCard";
import TagsCard from "./TagsCard";
import LineItemsCard from "./LineItemsCard";
import Link from "next/link";

const OrderSlugPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const order = await fetchOrderById(id);
  return (
    <div className="max-w-6xl mx-auto py-5 space-y-4">
      {/* Main Order Card */}
      <section className="flex flex-col">
        <div className="text-2xl font-bold flex items-center">
          <Link href="/" className="text-decoration-none">
            <InboxIcon className="mr-2" />
          </Link>
          <ChevronRight size={16} className="mr-2" />
          <h1>{order.name}</h1>
          <Badge
            variant="outline"
            style={financialStatusVariant[order.displayFinancialStatus]}
            className="ml-4"
          >
            {order.displayFinancialStatus}
          </Badge>
          <Badge
            variant="secondary"
            style={fulfillmentStatusVariant[order.displayFulfillmentStatus]}
            className="ml-2"
          >
            {order.displayFulfillmentStatus}
          </Badge>
        </div>
        <span className="flex items-center text-sm text-muted-foreground">
          {new Date(order.createdAt).toLocaleString()}
        </span>
      </section>

      <div className="flex flex-row  space-x-6 ">
        <div className="flex-1 max-w-4xl">
          <LineItemsCard lineItems={order.lineItems} />
        </div>
        {/* Secondary Card */}
        <div className="flex-1 max-w-xs space-y-4">
          <NotesCard notes={order.note} />
          <CustomerCard customer={order.customer} />
          <TagsCard tags={order.tags} />
        </div>
      </div>
    </div>
  );
};

export default OrderSlugPage;
