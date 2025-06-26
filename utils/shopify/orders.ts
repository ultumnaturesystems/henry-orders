"use server";

import { Order, OrderByIDResponse } from "@/utils/shopify/types";
import { client } from "@/utils/shopify/client";

const presentmentMoney = `
    presentmentMoney {
        amount
        currencyCode
    }`;

const lineitemFields = `
        id
        title
        name
        quantity
        currentQuantity
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
        discountAllocations{
            allocatedAmountSet{
                presentmentMoney{
                    amount
                }
            }
            discountApplication{
                value{
                    __typename
                    ... on MoneyV2{
                        amount
                        currencyCode
                    }
                    ... on PricingPercentageValue{
                        percentage
                    }
                }
            }
        }
        originalUnitPriceSet{
            presentmentMoney{
                amount
                currencyCode
            }
        }
        discountedUnitPriceAfterAllDiscountsSet{
            presentmentMoney{
                amount
                currencyCode
            }
        }
        discountedTotalSet(withCodeDiscounts: true){
            presentmentMoney{
                amount
                currencyCode
            }
        }
`;

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
                        currentSubtotalPriceSet{
                            ${presentmentMoney}
                        }
                        currentTotalPriceSet{
                            ${presentmentMoney}
                        }
                        currentShippingPriceSet{
                            ${presentmentMoney}
                        }
                        originalTotalPriceSet{
                            ${presentmentMoney}
                        }              
                        displayFinancialStatus
                        displayFulfillmentStatus
                        shippingLines(first:10){
                            nodes{
                                title
                                currentDiscountedPriceSet{
                                    ${presentmentMoney}
                                }
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
                                        ${lineitemFields}
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
                                ${lineitemFields}
                            }
                        }
                    }
                }
            `;

    const response = await fetch(process.env.SHOPIFY_CHANNEL_URL!, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN!,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ query: operation }),
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = (await response.json()) as OrderByIDResponse;
    if (responseData?.errors) {
      console.log(responseData?.errors);
      throw new Error(responseData.errors);
    }
    return responseData.data?.order as Order;
    // const { data, errors } = await client.request(operation, {
    //   variables: { id: `gid://shopify/Order/${orderId}` },
    // });
    // if (errors) {
    //   console.error("GraphQL errors:", errors);
    //   throw new Error("Failed to fetch order");
    // }
    // return data?.order as Order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch order");
  }
}
