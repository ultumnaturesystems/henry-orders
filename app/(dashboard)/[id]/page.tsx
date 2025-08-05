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
import OrderTotalCard from "./OrderTotalCard";
import { splitFulfilledLineItems } from "./utils";
import { Button } from "@/components/ui/button";

// Force dynamic rendering and disable caching
export const revalidate = 0;

const OrderSlugPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const order = await fetchOrderById(id);
  const itemGroups = splitFulfilledLineItems(order);
  return (
    <div className="max-w-6xl mx-auto py-5 space-y-4 px-4 sm:px-6">
      {/* Main Order Card */}
      <section className="flex flex-col h-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="text-xl sm:text-2xl font-bold flex flex-wrap items-center gap-2">
            <Link href="/" className="text-decoration-none">
              <InboxIcon className="mr-2" />
            </Link>
            <ChevronRight size={16} className="hidden sm:block" />
            <h1 className="break-all">{order.name}</h1>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                style={financialStatusVariant[order.displayFinancialStatus]}
                className="text-xs sm:text-sm"
              >
                {order.displayFinancialStatus}
              </Badge>
              <Badge
                variant="secondary"
                style={fulfillmentStatusVariant[order.displayFulfillmentStatus]}
                className="text-xs sm:text-sm"
              >
                {order.displayFulfillmentStatus}
              </Badge>
              {order.closed && (
                <Badge variant="outline" className="text-xs sm:text-sm">
                  Archived
                </Badge>
              )}
            </div>
          </div>
          <Link
            href={`/${id}/invoice`}
            className="no-underline w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer active:scale-95 transition-transform w-full sm:w-auto"
            >
              View Invoice
            </Button>
          </Link>
          {/* <PrintButton order={order} /> */}
        </div>
        <span className="flex items-center text-sm text-muted-foreground mt-2">
          {new Date(order.createdAt).toLocaleString()}
        </span>
      </section>

      <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
        <div className="flex-1 lg:max-w-4xl space-y-4">
          {itemGroups?.map((group) => (
            <LineItemsCard
              key={`${group.type}-${group.fulfillment?.id}-${group.fulfillment?.name}`}
              itemGroup={group}
            />
          ))}
          <OrderTotalCard order={order} />
        </div>
        {/* Secondary Card */}
        <div className="flex-1 lg:max-w-xs space-y-4">
          <NotesCard notes={order.note} />
          <CustomerCard customer={order.customer} />
          {/* <TagsCard tags={order.tags} /> */}
        </div>
      </div>
    </div>
  );
};

export default OrderSlugPage;
