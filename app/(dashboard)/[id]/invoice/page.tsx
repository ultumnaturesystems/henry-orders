import { fetchOrderById } from "@/utils/shopify/orders";
import PrintButton from "../PrintButton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import InvoiceSection from "./InvoiceSection";
const InvoicePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const order = await fetchOrderById(id);

  return (
    <div className="max-w-6xl mx-auto py-5 space-y-4">
      <section className="flex flex-col h-full">
        <div className="flex justify-between">
          <div className="text-2xl font-bold flex items-center ">
            <Link href={`/${id}`} className="text-decoration-none p-1">
              <ArrowLeft className="p-1 hover:bg-gray-200  rounded transition-colors" />
            </Link>
            <h1>Invoice for {order?.name}</h1>
          </div>
          <PrintButton order={order} />
        </div>
      </section>
      <InvoiceSection order={order} />
    </div>
  );
};

export default InvoicePage;
