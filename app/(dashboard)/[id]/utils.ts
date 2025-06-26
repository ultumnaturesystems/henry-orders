import { Fulfillment, LineItem, Order } from "@/utils/shopify/types";

type FulfillmentStatus = "FULFILLED" | "UNFULFILLED" | "REMOVED";

export function splitFulfilledLineItems(order: Order) {
  const itemGroups: {
    nodes: LineItem[];
    type: FulfillmentStatus;
    fulfillment: Fulfillment | null;
  }[] = [];
  const { displayFulfillmentStatus, lineItems, fulfillments } = order;
  if (displayFulfillmentStatus === "UNFULFILLED")
    return [
      {
        nodes: lineItems.nodes,
        type: "UNFULFILLED" as FulfillmentStatus,
        fulfillment: null,
      },
    ];

  fulfillments.forEach((fulfillment) => {
    const {
      fulfillmentLineItems: { nodes },
    } = fulfillment;
    const items = nodes.map(({ lineItem }) => lineItem);
    const group = {
      nodes: items,
      type: "FULFILLED" as FulfillmentStatus,
      fulfillment,
    };
    itemGroups.push(group);
  });

  //from original order line items, split into unfulfilled and removed
  // - removed: if line items have a currentQuantity of 0
  // - unfulfilled: if line item ID is found in itemGroups (previously populated with fulfilled items)
  lineItems.nodes
    .reduce(
      (acc: [LineItem[], LineItem[]], lineItem) => {
        if (lineItem.currentQuantity === 0) {
          acc[1].push(lineItem);
        } else {
          const { id: currId } = lineItem;
          if (
            itemGroups.some((group) =>
              group.nodes.every((item) => item.id !== currId)
            )
          )
            acc[0].push(lineItem);
        }
        return acc;
      },
      [[], []] as [LineItem[], LineItem[]]
    )
    .forEach((group, index) => {
      if (group.length > 0) {
        const type = index === 0 ? "UNFULFILLED" : "REMOVED";
        itemGroups.push({
          nodes: group,
          type,
          fulfillment: null,
        });
      }
    });
  return itemGroups.sort((a, b) => {
    if (a.type && !b.type) return 1;
    if (!a.type && b.type) return -1;
    return 0;
  });
}
