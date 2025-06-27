"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Order } from "@/utils/shopify/types";

interface PrintButtonProps {
  order: Order;
}

const PrintButton = ({ order }: PrintButtonProps) => {
  const handlePrint = () => {
    const printContent = document.getElementById("invoice-details")?.innerHTML;
    if (!printContent) return;
    console.log("Printing order:", order.name);
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
          <title>Order ${order.name} - Invoice</title>
          <style>
            hr{
                color: #000;
            }
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              line-height: 1.4;
              color: #000;
            }
             table { 
              border-collapse: collapse; 
              width: 100%; 
            }
            th, td { 
              padding: 8px; 
            }
            th { 
              background-color: #f5f5f5; 
              font-weight: bold;
            }
            tr { border: 1px solid #000; } 
            /* Tailwind equivalents */
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .justify-center { justify-content: center; }
            .justify-between { justify-content: space-between; }
            .items-end { align-items: flex-end; }
            .text-left { text-align: left; }
            .text-sm { font-size: 0.875rem; }
            .text-xl { font-size: 1.25rem; }
            .font-bold { font-weight: bold; }
            .gap-0 { gap: 0; }
            .gap-2 { gap: 1rem; }
            .p-4 { padding: 1rem; }
            .bg-white { background-color: white; }
            .rounded-lg { border-radius: 0.5rem; }
            .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
            .w-full { width: 100%; }
            .h-full { height: 100%; }
            .mr-2 { margin-right: 0.5rem; }
            .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
            .my-4 { margin-top: 1rem; margin-bottom: 1rem; }
            .m-1 { margin: 0.25rem; }
            @media print {
              body { margin: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className="cursor-pointer active:scale-95 transition-transform"
    >
      Print
    </Button>
  );
};

export default PrintButton;
