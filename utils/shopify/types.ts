export type FulfillmentDisplayStatus =
  | "ATTEMPTED_DELIVERY"
  | "CANCELED"
  | "CONFIRMED"
  | "DELAYED"
  | "DELIVERED"
  | "FAILURE"
  | "FULFILLED"
  | "IN_TRANSIT"
  | "LABEL_PRINTED"
  | "LABEL_PURCHASED"
  | "LABEL_VOIDED"
  | "MARKED_AS_FULFILLED"
  | "NOT_DELIVERED"
  | "OUT_FOR_DELIVERY"
  | "PICKED_UP"
  | "READY_FOR_PICKUP"
  | "SUBMITTED";

export type DisplayFinancialStatus =
  | "AUTHORIZED"
  | "PAID"
  | "PARTIALLY_PAID"
  | "PARTIALLY_REFUNDED"
  | "PENDING"
  | "REFUNDED"
  | "VOIDED";

export type DisplayFulfillmentStatus =
  | "FULFILLED"
  | "IN_PROGRESS"
  | "ON_HOLD"
  | "OPEN"
  | "PARTIALLY_FULFILLED"
  | "PENDING_FULFILLMENT"
  | "REQUEST_DECLINED"
  | "RESTOCKED"
  | "SCHEDULED"
  | "UNFULFILLED";

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  numberOfOrders: number;
  defaultAddress: Address | null;
}

export interface Address {
  address1: string;
  address2: string | null;
  city: string;
  country: string;
  company: string | null;
  name: string;
  phone: string | null;
  province: string;
  provinceCode: string | null;
  zip: string;
}

interface PriceSet {
  presentmentMoney: PresentmentMoney;
}

interface PresentmentMoney {
  amount: number;
  currencyCode: string;
}

export interface Order {
  id: string;
  name: string;
  note: string;
  createdAt: string;
  customer: Customer;

  currentSubtotalPriceSet: PriceSet;
  currentTotalPriceSet: PriceSet;
  currentShippingPriceSet: PriceSet;
  shippingLines: { nodes: ShippingLine[] };
  displayFinancialStatus: DisplayFinancialStatus;
  displayFulfillmentStatus: DisplayFulfillmentStatus;
  fulfillments: Fulfillment[];
  lineItems: { nodes: LineItem[] };
  tags: string[];
}

export interface LineItem {
  id: string;
  title: string;
  name: string;
  quantity: number;
  unfulfilledQuantity: number;
  sku: string;
  variant: {
    title: string;
  };
  image: Image | null;
  originalUnitPriceSet: {
    presentmentMoney: {
      amount: number;
      currencyCode: string;
    };
  };
}

export interface ShippingLine {
  title: string;
}

export interface Image {
  url: string;
  altText: string;
  height: number;
  width: number;
}

export interface Fulfillment {
  id: string;
  name: string;
  fulfillmentLineItems: {
    nodes: {
      id: string;
      quantity: number;
      lineItem: LineItem;
    }[];
  };
  updatedAt: string;
  deliveredAt: string;
  estimatedDeliveryAt: string;
  displayStatus: FulfillmentDisplayStatus;
  trackingInfo: {
    company: string;
    url: string;
    number: string;
  }[];
}

//Styling for Badges using financial and fulfillment status

export const financialStatusVariant: Record<
  DisplayFinancialStatus,
  { label: string; backgroundColor: string }
> = {
  PAID: { label: "Paid", backgroundColor: "" },
  PARTIALLY_PAID: {
    label: "Partially Paid",
    backgroundColor: "rgba(255, 214, 164, 1)",
  },
  AUTHORIZED: {
    label: "Authorized",
    backgroundColor: "rgba(255, 235, 120, 1)",
  },
  PENDING: {
    label: "Payment Pending",
    backgroundColor: "rgba(255, 214, 164, 1)",
  },
  PARTIALLY_REFUNDED: {
    label: "Partially Refunded",
    backgroundColor: "",
  },
  REFUNDED: { label: "Refunded", backgroundColor: "" },
  VOIDED: { label: "Voided", backgroundColor: "" },
};

export const fulfillmentStatusVariant: Record<
  DisplayFulfillmentStatus,
  { label: string; backgroundColor: string }
> = {
  FULFILLED: { label: "Fulfilled", backgroundColor: "" },
  PARTIALLY_FULFILLED: {
    label: "Partially Fulfilled",
    backgroundColor: "rgba(255, 214, 164, 1)",
  },
  UNFULFILLED: {
    label: "Unfulfilled",
    backgroundColor: "rgba(255, 235, 120, 1)",
  },
  SCHEDULED: {
    label: "Scheduled",
    backgroundColor: "",
  },
  ON_HOLD: {
    label: "On Hold",
    backgroundColor: "",
  },
  RESTOCKED: { label: "Restocked", backgroundColor: "" },
  REQUEST_DECLINED: { label: "Request Declined", backgroundColor: "" },
  PENDING_FULFILLMENT: {
    label: "Pending Fulfillment",
    backgroundColor: "",
  },
  IN_PROGRESS: {
    label: "In Progress",
    backgroundColor: "",
  },
  OPEN: {
    label: "Open",
    backgroundColor: "",
  },
};
