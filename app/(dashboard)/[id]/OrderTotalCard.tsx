import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/utils/shopify/types";

interface OrderTotalCardProps {
  order: Order;
}

const OrderTotalCard = ({ order }: OrderTotalCardProps) => {
  const {
    lineItems,
    currentSubtotalPriceSet,
    currentShippingPriceSet,
    currentTotalPriceSet,
    shippingLines,
  } = order;

  const totalItems = lineItems.edges.reduce(
    (total: number, { node }: { node: { quantity: number } }) =>
      total + node.quantity,
    0
  );

  return (
    <Card className="gap-3">
      <CardContent>
        <Table>
          <TableHeader />
          <TableBody>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>{totalItems} items</TableCell>
              <TableCell>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency:
                    currentSubtotalPriceSet.presentmentMoney.currencyCode,
                }).format(currentSubtotalPriceSet.presentmentMoney.amount)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shipping</TableCell>
              <TableCell>
                {shippingLines.edges.length > 0
                  ? shippingLines.edges.map(({ node }) => node.title).join(", ")
                  : "No shipping"}
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency:
                    currentShippingPriceSet.presentmentMoney.currencyCode,
                }).format(currentShippingPriceSet.presentmentMoney.amount)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell />
              <TableCell>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currentTotalPriceSet.presentmentMoney.currencyCode,
                }).format(currentTotalPriceSet.presentmentMoney.amount)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrderTotalCard;
