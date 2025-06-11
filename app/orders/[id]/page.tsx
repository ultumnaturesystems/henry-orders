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

const OrderSlugPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const order = await fetchOrderById(id);
  //console.log("Fetched order:", order);
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Order <span className="text-muted-foreground">{order.name}</span>
            <Badge variant="outline" className="ml-4">
              {order.displayFinancialStatus}
            </Badge>
            <Badge variant="secondary" className="ml-2">
              {order.displayFulfillmentStatus}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div>
              <span className="font-semibold">Customer:</span>{" "}
              {order.customer.firstName} {order.customer.lastName}
            </div>
            <div>
              <span className="font-semibold">Created:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-semibold">Tags:</span>{" "}
              {order.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="mr-1">
                  {tag}
                </Badge>
              ))}
            </div>
            <div>
              <span className="font-semibold">Note:</span> {order.note || "—"}
            </div>
          </div>
          <div>
            <span className="font-semibold">Line Items:</span>
            <Table>
              <TableHeader></TableHeader>
              <TableBody>
                {order.lineItems.edges.map(({ node }) => {
                  const { image, originalUnitPriceSet, quantity } = node;
                  return (
                    <TableRow key={node.id}>
                      <TableCell>
                        {image ? (
                          <Image
                            src={image.url}
                            alt={image.altText || "Product Image"}
                            width={50}
                            height={50}
                          />
                        ) : (
                          <ImageIcon
                            className="text-muted-foreground"
                            style={{ width: "50px" }}
                          />
                        )}
                      </TableCell>
                      <TableCell
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <span className="font-semibold">{node.name}</span>
                        {node.sku && (
                          <span className="text-sm text-muted-foreground">
                            SKU: {node.sku}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency:
                            originalUnitPriceSet.presentmentMoney.currencyCode,
                        }).format(originalUnitPriceSet.presentmentMoney.amount)}
                      </TableCell>

                      <TableCell>x</TableCell>
                      <TableCell
                        style={{ textAlign: "center" }}
                      >{`${quantity}`}</TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency:
                            originalUnitPriceSet.presentmentMoney.currencyCode,
                        }).format(
                          originalUnitPriceSet.presentmentMoney.amount *
                            quantity
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4">
            <span className="font-semibold">Total: </span>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency:
                order.currentTotalPriceSet.presentmentMoney.currencyCode,
            }).format(order.currentTotalPriceSet.presentmentMoney.amount)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSlugPage;
