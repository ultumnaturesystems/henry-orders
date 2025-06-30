import "../globals.css";
import NavigationMenu from "@/components/navigation-menu";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NextTopLoader />
      <NavigationMenu />
      {children}
    </>
  );
}
