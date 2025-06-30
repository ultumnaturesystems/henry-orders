import "../globals.css";
import NavigationMenu from "@/components/navigation-menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationMenu />
      {children}
    </>
  );
}
