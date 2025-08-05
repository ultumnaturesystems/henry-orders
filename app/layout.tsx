import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "UNS Orders",
  description: "Shopify Orders for UNS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.className} antialiased`}
        style={{ background: "rgba(241, 241, 241, 1)" }}
      >
        <Analytics />
        <NextTopLoader showSpinner={false} />
        {children}
        <Toaster richColors={true} />
      </body>
    </html>
  );
}
