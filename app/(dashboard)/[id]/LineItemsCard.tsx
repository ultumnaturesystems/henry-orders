"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderLineItems } from "@/utils/shopify/types";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface LineItemsCardProps {
  lineItems: OrderLineItems;
}

const LineItemsCard = ({ lineItems }: LineItemsCardProps) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader></TableHeader>
          <TableBody>
            {lineItems.edges.map(({ node }) => {
              const { image, originalUnitPriceSet, quantity } = node;
              return (
                <TableRow key={node.id}>
                  <TableCell>
                    <LineItemImage image={image} />
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
                      originalUnitPriceSet.presentmentMoney.amount * quantity
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const LineItemImage = ({
  image,
}: {
  image?: OrderLineItems["edges"][number]["node"]["image"];
}) => {
  const [imageError, setImageError] = useState<boolean>(false);
  if (!image || imageError) {
    return (
      <ImageIcon className="text-muted-foreground" style={{ width: "50px" }} />
    );
  }
  return (
    <Image
      src={image.url}
      alt={image.altText || "Product Image"}
      width={50}
      height={50}
      onError={() => setImageError(true)}
    />
  );
};

export default LineItemsCard;
