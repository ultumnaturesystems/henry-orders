"use server";

import { Order, OrderByIDResponse } from "@/utils/shopify/types";
import { client } from "@/utils/shopify/client";

const presentmentMoney = `
    presentmentMoney {
        amount
        currencyCode
    }`;

export async function fetchOrderById(orderId: string) {
  try {
    const operation = `
                query OrderQuery($id: ID!){
                    order(id: $id) {
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
                        currentSubtotalPriceSet{
                            ${presentmentMoney}
                        }
                        currentTotalPriceSet{
                            ${presentmentMoney}
                        }
                        currentShippingPriceSet{
                            ${presentmentMoney}
                        }
                        displayFinancialStatus
                        displayFulfillmentStatus
                        shippingLines(first:10){
                            nodes{
                                title
                            }
                        }
                        tags
                        closed
                        fulfillments(first:100){
                            id
                            name
                            fulfillmentLineItems(first:250){
                                nodes{
                                    id
                                    quantity
                                    lineItem{
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
                            deliveredAt
                            displayStatus
                            updatedAt
                            estimatedDeliveryAt
                            trackingInfo{
                                company
                                url
                                number
                            }
                        }
                        lineItems(first:200){
                            nodes{
                                id
                                title
                                name
                                quantity
                                unfulfilledQuantity
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
            `;

    // const response = await fetch(process.env.SHOPIFY_CHANNEL_URL!, {
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
    // const responseData = (await response.json()) as OrderByIDResponse;

    // return responseData.data.order as Order;
    const { data, errors } = await client.request(operation, {
      variables: { id: `gid://shopify/Order/${orderId}` },
    });
    if (errors) {
      console.error("GraphQL errors:", errors);
      throw new Error("Failed to fetch order");
    }
    return data?.order as Order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch order");
  }
}
