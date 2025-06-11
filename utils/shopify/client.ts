import { createAdminApiClient } from "@shopify/admin-api-client";

export const client = createAdminApiClient({
  storeDomain: "ultumnaturesystems.myshopify.com",
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN!,
  apiVersion: "2025-04",
});
