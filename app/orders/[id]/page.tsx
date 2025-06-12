import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchOrderById } from "@/utils/shopify/orders";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import {
  financialStatusVariant,
  fulfillmentStatusVariant,
} from "@/utils/shopify/types";
import CustomerCard from "./CustomerCard";
import NotesCard from "./NotesCard";
import TagsCard from "./TagsCard";
import LineItemsCard from "./LineItemsCard";

const OrderSlugPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const order = await fetchOrderById(id);
  //console.log("Fetched order:", order);
  return (
    <div className="max-w-6xl mx-auto py-5 space-y-4">
      {/* Main Order Card */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold flex items-center">
          {order.name}
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
        </h1>
        <caption className="flex items-center text-sm text-muted-foreground">
          {new Date(order.createdAt).toLocaleString()}
        </caption>
      </div>

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
