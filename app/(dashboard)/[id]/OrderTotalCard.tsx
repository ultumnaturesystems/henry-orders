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
    currentTotalPriceSet,
    shippingLines,
    discountApplications,
  } = order;

  const totalItems = lineItems.nodes.reduce(
    (total: number, { quantity }: { quantity: number }) => total + quantity,
    0
  );

  const originalTotalCost = lineItems.nodes.reduce(
    (
      total: number,
      {
        discountedUnitPriceAfterAllDiscountsSet,
        currentQuantity,
      }: {
        discountedUnitPriceAfterAllDiscountsSet: {
          presentmentMoney: { amount: number };
        };
        currentQuantity: number;
      }
    ) =>
      total +
      discountedUnitPriceAfterAllDiscountsSet.presentmentMoney.amount *
        currentQuantity,
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
              <TableCell className="text-right">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency:
                    currentSubtotalPriceSet.presentmentMoney.currencyCode,
                }).format(originalTotalCost)}
              </TableCell>
            </TableRow>
            {discountApplications.nodes.length > 0 && (
              <TableRow>
                <TableCell>Discounts</TableCell>
                <TableCell />
                <TableCell className="text-right"></TableCell>
              </TableRow>
            )}
            {shippingLines.nodes.map((line, index) => (
              <TableRow
                key={`${line.title}-${index}`}
                className={
                  index !== shippingLines.nodes.length - 1
                    ? "border-b-0 mb-0"
                    : ""
                }
              >
                <TableCell>{index === 0 ? "Shipping" : ""}</TableCell>
                <TableCell className="flex flex-col">
                  <span className="text-sm">{line.title}</span>
                </TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency:
                      line.currentDiscountedPriceSet.presentmentMoney
                        .currencyCode,
                  }).format(
                    line.currentDiscountedPriceSet.presentmentMoney.amount
                  )}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold">
              <TableCell>Total</TableCell>
              <TableCell />
              <TableCell className="text-right">
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
