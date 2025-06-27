"use client";

type UNSLogoIconProps = React.SVGProps<SVGSVGElement>;
import WhiteUNSLogo from "@/public/UNS-LOGO.png";
import Image from "next/image";

export default function UNSLogoIcon({ className, ...props }: UNSLogoIconProps) {
  return (
    <Image
      src={WhiteUNSLogo}
      height={50}
      width={50}
      alt="UNS Logo"
      className={`h-8 w-auto ${className}`}
    />
  );
}
