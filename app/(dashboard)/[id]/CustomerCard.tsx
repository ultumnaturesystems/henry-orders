import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer } from "@/utils/shopify/types";

interface CustomerCardProps {
  customer: Customer;
}
const CustomerCard = ({ customer }: CustomerCardProps) => {
  const { firstName, lastName, email, numberOfOrders, defaultAddress } =
    customer;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <span className="text-sm ">
            {firstName} {lastName}
          </span>
          <span className="text-sm ">{numberOfOrders} orders</span>
          <h2 className="font-semibold">Contact Information</h2>
          <span className="text-sm">{email || "—"}</span>
          <h2 className="font-semibold">Shipping Address</h2>
          <div className="flex flex-col space-y-0.5 text-sm ">
            <span>{defaultAddress?.name}</span>
            <span>{defaultAddress?.company}</span>
            <span>{defaultAddress?.address1}</span>
            {defaultAddress?.address2 && (
              <span>{defaultAddress?.address2}</span>
            )}
            <span>
              {defaultAddress?.city} {defaultAddress?.provinceCode}{" "}
              {defaultAddress?.zip}
            </span>
            <span>{defaultAddress?.country}</span>
            {defaultAddress?.phone && <span>{defaultAddress.phone}</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
