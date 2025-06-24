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

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
  numberOfOrders: number;
  defaultAddress: Address | null;
};

export type Address = {
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
};

export type Order = {
  id: string;
  name: string;
  note: string;
  createdAt: string;
  customer: Customer;

  currentTotalPriceSet: {
    presentmentMoney: {
      amount: number;
      currencyCode: string;
    };
  };
  displayFinancialStatus: DisplayFinancialStatus;
  displayFulfillmentStatus: DisplayFulfillmentStatus;
  lineItems: OrderLineItems;
  tags: string[];
};

export type OrderLineItems = {
  edges: {
    node: {
      id: string;
      title: string;
      name: string;
      quantity: number;
      sku: string;
      variant: {
        title: string;
      };
      image: null | {
        url: string;
        altText: string;
        height: number;
        width: number;
      };
      originalUnitPriceSet: {
        presentmentMoney: {
          amount: number;
          currencyCode: string;
        };
      };
    };
  }[];
};

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
