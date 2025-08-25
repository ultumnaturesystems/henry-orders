"use server";

import { client } from "@/utils/shopify/client";
export async function fetchOrders() {
  try {
    const operation = `
            query {
                orders(first: 200, query: "tag:'Henry' NOT status:'cancelled'", sortKey: CREATED_AT, reverse: true) {
                    edges{
                        node{
                            id
                            name
                            note
                            createdAt
                            customer{
                                id
                                firstName
                                lastName
                            }
                            currentTotalPriceSet{
                                presentmentMoney{
                                    amount
                                    currencyCode
                                }
                            }
                            discountApplications(first:10){
                                nodes{
                                    targetSelection
                                }
                            }
                            displayFinancialStatus
                            displayFulfillmentStatus
                            lineItems(first:200){
                                nodes{
                                    id
                                    name
                                }
                            }
                            tags
                        }
                    }
                }
            }
        `;

    const { data, errors } = await client.request(operation);
    if (errors) {
      console.error("GraphQL errors:", errors);
      throw new Error("Failed to fetch orders");
    }
    return data.orders.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
