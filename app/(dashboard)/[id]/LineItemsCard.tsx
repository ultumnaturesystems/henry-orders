"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Image as ShopifyImage,
  LineItem,
  Fulfillment,
} from "@/utils/shopify/types";
import Image from "next/image";
import { Image as ImageIcon, PackageOpen, Truck } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import FulfillmentDetails from "./FulfillmentDetails";

interface LineItemsCardProps {
  itemGroup: {
    nodes: LineItem[];
    type: "FULFILLED" | "UNFULFILLED" | "REMOVED";
    fulfillment: Fulfillment | null;
  };
}

const LineItemsCard = ({ itemGroup }: LineItemsCardProps) => {
  const { nodes: lineItems, type, fulfillment } = itemGroup;
  const totalItems = lineItems.reduce(
    (total: number, { quantity }: { quantity: number }) => total + quantity,
    0
  );
  const { badgeColor, icon, title } = asd(type);

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Badge
            className={`${badgeColor} text-gray-800 tracking-wide text-sm font-semibold flex items-center gap-1`}
          >
            {icon}
            {`${title} (${totalItems})`}
          </Badge>
          <h3>{fulfillment?.name}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {type === "FULFILLED" && (
          <section className="px-3 py-2 border rounded-lg">
            <div className="flex flex-col text-sm">
              <FulfillmentDetails fulfillment={fulfillment} />
            </div>
          </section>
        )}
        <Table>
          <TableBody>
            {lineItems.map((lineItem) => {
              const { image, originalUnitPriceSet, quantity, title, variant } =
                lineItem;
              const { title: variantTitle } = variant;
              return (
                <TableRow key={lineItem.id}>
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

const LineItemImage = ({ image }: { image?: ShopifyImage | null }) => {
  const [imageError, setImageError] = useState<boolean>(false);
  if (!image || imageError) {
    return <ImageIcon className="text-muted-foreground" size={50} />;
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

const asd = (type: "FULFILLED" | "UNFULFILLED" | "REMOVED") => {
  switch (type) {
    case "FULFILLED":
      return {
        title: "Fulfilled",
        badgeColor: "bg-green-300",
        icon: <Truck size={16} />,
      };
    case "UNFULFILLED":
      return {
        title: "Unfulfilled",
        badgeColor: "bg-yellow-200",
        icon: <PackageOpen size={16} />,
      };
    case "REMOVED":
      return { title: "Removed", badgeColor: "bg-red-200", icon: <></> };
  }
};

export default LineItemsCard;
