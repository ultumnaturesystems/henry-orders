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
import { Badge } from "@/components/ui/badge";

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
              const { image, originalUnitPriceSet, quantity, title, variant } =
                node;
              const { title: variantTitle } = variant;
              return (
                <TableRow key={node.id}>
                  <TableCell>
                    <LineItemImage image={image} />
                  </TableCell>
                  <TableCell className="flex flex-col">
                    <span className="font-semibold">{title}</span>
                    {variantTitle !== "Default Title" && (
                      <Badge variant="secondary" className="bg-gray-200">
                        {variantTitle}
                      </Badge>
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
                  <TableCell
                    style={{ textAlign: "center", paddingLeft: "25px" }}
                  >
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
