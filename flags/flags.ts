import { flag } from "flags/next";

export const orderTagsFlag = flag({
  key: "order-tags-flag",
  description: "Show order tags from Shopify in the order details page",
  decide() {
    // This flag is always enabled in the current environment
    return true;
  },
});
