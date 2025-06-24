import { Fulfillment } from "@/utils/shopify/types";
import { Badge } from "@/components/ui/badge";

interface FulfillmentDetailsProps {
  fulfillment: Fulfillment | null;
}

const DateFormatter = (date: string, includeTime: boolean = false) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }
  return new Date(date).toLocaleDateString("en-US", options);
};

const FulfillmentDetails = ({ fulfillment }: FulfillmentDetailsProps) => {
  if (!fulfillment) return null;
  const { displayStatus, updatedAt, estimatedDeliveryAt } = fulfillment;
  switch (displayStatus) {
    case "FULFILLED":
      return (
        <>
          <span className="text-muted-foreground">Fulfilled</span>
          <span>{DateFormatter(updatedAt, true)}</span>
          {fulfillment.trackingInfo[0]?.number && (
            <>
              <span className="text-muted-foreground mt-1">
                Tracking number
              </span>
              <div className="flex gap-2">
                <a
                  href={fulfillment.trackingInfo[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  {fulfillment.trackingInfo[0]?.number}
                </a>
              </div>
            </>
          )}
        </>
      );
    case "DELIVERED":
      return (
        <>
          <span className="text-muted-foreground">{`${fulfillment.trackingInfo[0]?.company} tracking number`}</span>
          <div className="flex gap-2">
            <a
              href={fulfillment.trackingInfo[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 hover:text-blue-800"
            >
              {fulfillment.trackingInfo[0]?.number}
            </a>
            <Badge variant="secondary">{fulfillment.displayStatus}</Badge>
          </div>
          <span className="text-muted-foreground">Delivered At</span>
          <span>{DateFormatter(updatedAt, true)}</span>
        </>
      );

    case "CONFIRMED":
    case "IN_TRANSIT":
      return (
        <>
          <span className="text-muted-foreground">Fulfilled</span>
          <span>{DateFormatter(updatedAt, true)}</span>
          <span className="text-muted-foreground">{`${fulfillment.trackingInfo[0]?.company} tracking number`}</span>
          <div className="flex gap-2">
            <a
              href={fulfillment.trackingInfo[0]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 hover:text-blue-800"
            >
              {fulfillment.trackingInfo[0]?.number}
            </a>
            <Badge variant="secondary">{fulfillment.displayStatus}</Badge>
          </div>
          {estimatedDeliveryAt && (
            <>
              <span className="text-muted-foreground">Deliver by</span>
              <span>{DateFormatter(estimatedDeliveryAt, false)}</span>
            </>
          )}
        </>
      );
    default:
      return <>UNACCOUNTED DISPLAY STATUS: {displayStatus}</>;
  }
};

export default FulfillmentDetails;
