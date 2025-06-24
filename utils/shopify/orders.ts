"use server";

import { client } from "./client";
import { Order } from "@/utils/shopify/types";

export async function fetchOrders() {
  try {
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

export async function fetchOrderById(orderId: string) {
  try {
    const operation = `
                query {
                    order(id: "gid://shopify/Order/${orderId}") {
                        id
                        name
                        note
                        createdAt
                        customer{
                            id
                            firstName
                            lastName
                            email
                            numberOfOrders
                            defaultAddress{
                                address1
                                address2
                                city
                                company
                                country
                                name
                                phone
                                province
                                provinceCode
                                zip
                            }
                        }
                        currentTotalPriceSet{
                            presentmentMoney{
                                amount
                                currencyCode
                            }
                        }
                        displayFinancialStatus
                        displayFulfillmentStatus
                        
                        tags
                        lineItems(first:200){
                            edges{
                                node{
                                    id
                                    title
                                    name
                                    quantity
                                    sku
                                    variant{
                                        title
                                    }
                                    image{
                                        url
                                        altText
                                        height
                                        width
                                    }
                                    originalUnitPriceSet{
                                        presentmentMoney{
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `;

    const { data, errors } = await client.request(operation);
    if (errors) {
      console.error("GraphQL errors:", errors);
      throw new Error("Failed to fetch order");
    }
    return data.order as Order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch order");
  }
}
