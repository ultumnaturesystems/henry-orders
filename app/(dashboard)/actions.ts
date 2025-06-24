"use server";

import { createAdminApiClient } from "@shopify/admin-api-client";

export async function fetchOrders() {
  try {
    const client = createAdminApiClient({
      storeDomain: "ultumnaturesystems.myshopify.com",
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN!,
      apiVersion: "2025-04",
    });

    const operation = `
            query {
                orders(first: 75, query: "tag:'Henry'", sortKey: CREATED_AT, reverse: true) {
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
                            displayFinancialStatus
                            displayFulfillmentStatus
                            lineItems(first:200){
                                edges{
                                    node{
                                        id
                                        name
                                    }
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
