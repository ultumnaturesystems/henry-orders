"use server";

import { OrdersResponse } from "@/utils/shopify/types";
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

    //   const response = await fetch(process.env.SHOPIFY_CHANNEL_URL!, {
    //   method: "POST",
    //   headers: {
    //     "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN!,
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   body: JSON.stringify({ query: operation }),
    // });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // const responseData = (await response.json()) as OrdersResponse;
    // const orders = responseData.data.orders.edges.map((edge) => edge.node);
    // console.log("Fetched orders:", orders);
    // return orders;

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
