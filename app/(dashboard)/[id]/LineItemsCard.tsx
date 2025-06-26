"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Image as ShopifyImage,
  LineItem,
  Fulfillment,
} from "@/utils/shopify/types";
import Image from "next/image";
import {
  Image as ImageIcon,
  PackageOpen,
  Truck,
  BadgeDollarSign,
} from "lucide-react";
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
  const { badgeColor, icon, title } = getFulfillmentItemStatus(type);

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
              const {
                image,
                originalUnitPriceSet,
                quantity,
                title,
                variant,
                discountAllocations,
                discountedTotalSet,
              } = lineItem;
              const {
                presentmentMoney: { amount },
              } = discountedTotalSet;
              const { title: variantTitle } = variant || {
                title: "Default Title",
              };
              return (
                <TableRow key={lineItem.id}>
                  <TableCell>
                    <div className="flex justify-center w-full">
                      <div className="rounded-lg border border-gray-200">
                        <LineItemImage image={image} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col justify-center h-full">
                      <span className="font-semibold">{title}</span>
                      {variantTitle !== "Default Title" && (
                        <Badge variant="secondary" className="bg-gray-200">
                          {variantTitle}
                        </Badge>
                      )}
                      {discountAllocations.length > 0 && (
                        <div className="flex gap-1 items-center text-sm text-muted-foreground">
                          <BadgeDollarSign size="16" />
                          <span>
                            {discountAllocations[0].discountApplication.value
                              .__typename === "MoneyV2"
                              ? `Discount (-$${discountAllocations[0].discountApplication.value.amount})`
                              : `Discount (-${discountAllocations[0].discountApplication.value.percentage}%)`}
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-end">
                    <LineItemDiscountedPrice lineItem={lineItem} />
                  </TableCell>
                  <TableCell>x</TableCell>
                  <TableCell
                    style={{ textAlign: "center" }}
                  >{`${quantity}`}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency:
                        originalUnitPriceSet.presentmentMoney?.currencyCode,
                    }).format(amount)}
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

const LineItemDiscountedPrice = ({ lineItem }: { lineItem: LineItem }) => {
  const { originalUnitPriceSet, discountedUnitPriceAfterAllDiscountsSet } =
    lineItem;

  //if discount for line item is applied
  if (
    originalUnitPriceSet.presentmentMoney.amount !==
    discountedUnitPriceAfterAllDiscountsSet.presentmentMoney.amount
  ) {
    return (
      <>
        <span className="line-through text-muted-foreground mr-2">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: originalUnitPriceSet.presentmentMoney.currencyCode,
          }).format(originalUnitPriceSet.presentmentMoney.amount)}
        </span>
        <span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency:
              discountedUnitPriceAfterAllDiscountsSet.presentmentMoney
                .currencyCode,
          }).format(
            discountedUnitPriceAfterAllDiscountsSet.presentmentMoney.amount
          )}
        </span>
      </>
    );
  }
  return (
    <span>
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: originalUnitPriceSet.presentmentMoney.currencyCode,
      }).format(originalUnitPriceSet.presentmentMoney.amount)}
    </span>
  );
};

const LineItemImage = ({ image }: { image?: ShopifyImage | null }) => {
  const [imageError, setImageError] = useState<boolean>(false);
  if (!image || imageError) {
    return <ImageIcon className="text-muted-foreground m-2 p-1" size={25} />;
  }
  return (
    <Image
      className="rounded-lg"
      src={image.url}
      alt={image.altText || "Product Image"}
      width={50}
      height={50}
      onError={() => setImageError(true)}
    />
  );
};

const getFulfillmentItemStatus = (
  type: "FULFILLED" | "UNFULFILLED" | "REMOVED"
) => {
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
