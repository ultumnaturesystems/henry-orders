"use client";

import { Order } from "@/utils/shopify/types";
import BlackUNSLogo from "@/public/UNS-LOGO.png";
import Image from "next/image";

interface InvoiceSectionProps {
  order: Order;
}

const InvoiceSection = ({ order }: InvoiceSectionProps) => {
  const {
    customer,
    currentSubtotalPriceSet,
    currentTotalPriceSet,
    totalReceivedSet,
  } = order;

  return (
    <section
      id="invoice-details"
      className="flex flex-col text-black h-full w-full border rounded-lg p-4 bg-white shadow-sm gap-1"
    >
      <section className="flex justify-between">
        <div className="h-full">
          <section className="flex flex-col">
            <span className="text-xl font-bold">Ultum Nature Systems</span>
            <span>2623 River Ave, Rosemead CA 91770</span>
          </section>

          <br />
          <section className="flex flex-col gap-0">
            <span className="text-xl font-bold">
              {customer?.defaultAddress?.company}
            </span>
            <span>{customer?.displayName}</span>
            <span>
              {customer?.defaultAddress?.address1}{" "}
              {customer?.defaultAddress?.address2}
            </span>
            <span>
              {customer?.defaultAddress?.city},{" "}
              {customer?.defaultAddress?.province}{" "}
              {customer?.defaultAddress?.zip}
            </span>
          </section>
        </div>
        <div className="flex flex-col mr-2 items-end">
          <Image
            src={BlackUNSLogo}
            alt="UNS Logo"
            width={120}
            height={120}
            className="m-1"
          />
          <span className="font-bold">Invoice {order?.name}</span>
          <span>
            {new Date(order?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>
      </section>

      <hr className="w-full" />
      <section className="flex flex-col gap-2">
        <span className="text-xl font-bold my-2">Payment Details</span>
        <table className="w-full text-sm border">
          <tbody>
            <tr className="border-b">
              <td className=" p-2">Subtotal Price:</td>
              <td className=" p-2 text-right">
                ${currentSubtotalPriceSet.presentmentMoney.amount}
              </td>
            </tr>
            <tr className="border-b p-2">
              <td className=" p-2">Shipping:</td>
              <td className=" p-2 text-right">
                ${order?.currentShippingPriceSet.presentmentMoney.amount}
              </td>
            </tr>
            <tr className="border-b p-2">
              <td className="font-bold p-2">Total Price:</td>
              <td className="p-2 text-right font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currentTotalPriceSet.presentmentMoney?.currencyCode,
                }).format(currentTotalPriceSet.presentmentMoney.amount)}
              </td>
            </tr>
            <tr className="border-b p-2">
              <td className="font-bold p-2">Total Paid:</td>
              <td className="p-2 text-right font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: totalReceivedSet.presentmentMoney?.currencyCode,
                }).format(totalReceivedSet.presentmentMoney.amount)}
              </td>
            </tr>
          </tbody>
        </table>
        <section className="flex flex-col gap-1 text-md mt-2">
          <span className="font-bold">DUE UPON RECEIPT.</span>
          <span className="mb-2">
            If you have any questions, please reach out to your sales
            representative.
          </span>
          <span>
            Please email photos of damaged/DOA live goods within 4 hours of
            delivery. ACCOUNTS@ultumnaturesystems.com There will be a 2%
            interest charge per month or fraction thereof, on all past due
            invoices. If account is turned over to our collection agency or
            attorney, customer shall pay all fees and costs to recover payment.
          </span>
        </section>
      </section>
      <hr className="w-full my-2" />
      <section className="flex flex-col gap-2">
        <span className="text-xl font-bold my-2">Item Details</span>
        <table className="w-full text-sm border">
          <thead>
            <tr className="border">
              <th className="p-2">Qty</th>
              <th className="text-left p-2">Item</th>
              <th className="text-left p-2">Price</th>
              <th className="text-left p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order?.lineItems.nodes
              ?.sort((a, b) => a.title.localeCompare(b.title))
              .filter((item) => item.currentQuantity > 0)
              .map(({ id, quantity, title, originalUnitPriceSet }) => (
                <tr key={id} className="border-b">
                  <td className="flex justify-center font-bold p-2">
                    {quantity}
                  </td>
                  <td className="p-2">{title}</td>
                  <td className="p-2">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency:
                        originalUnitPriceSet.presentmentMoney?.currencyCode,
                    }).format(originalUnitPriceSet.presentmentMoney.amount)}
                  </td>
                  <td className="p-2">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency:
                        originalUnitPriceSet.presentmentMoney?.currencyCode,
                    }).format(
                      originalUnitPriceSet.presentmentMoney.amount * quantity
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default InvoiceSection;
