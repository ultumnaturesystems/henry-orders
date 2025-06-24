import { Fulfillment, LineItem, Order } from "@/utils/shopify/types";

export function splitFulfilledLineItems(order: Order) {
  const itemGroups: {
    nodes: LineItem[];
    isFulfilled: boolean;
    fulfillment: Fulfillment | null;
  }[] = [];
  const { displayFulfillmentStatus, lineItems, fulfillments } = order;
  if (displayFulfillmentStatus === "UNFULFILLED")
    return [{ nodes: lineItems.nodes, isFulfilled: false, fulfillment: null }];

  fulfillments.forEach((fulfillment) => {
    const {
      fulfillmentLineItems: { nodes },
    } = fulfillment;
    const items = nodes.map(({ lineItem }) => lineItem);
    const group = {
      nodes: items,
      isFulfilled: true,
      fulfillment,
    };
    itemGroups.push(group);
  });

  const unfulfilled = lineItems.nodes
    .map((lineItem) => {
      const { id: currId } = lineItem;
      if (
        itemGroups.some((group) =>
          group.nodes.some((item) => item.id === currId)
        )
      )
        return;
      return lineItem;
    })
    .filter(Boolean) as LineItem[];
  itemGroups.push({
    nodes: unfulfilled,
    isFulfilled: false,
    fulfillment: null,
  });
  return itemGroups
    .sort((a, b) => {
      if (a.isFulfilled && !b.isFulfilled) return 1;
      if (!a.isFulfilled && b.isFulfilled) return -1;
      return 0;
    })
    .filter((group) => group.nodes.length > 0);
}
