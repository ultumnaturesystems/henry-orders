"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function NavigationMenu() {
  const handleLogout = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
    } else {
      // Optionally, redirect or show a success message
      console.log("Logout successful");
      redirect("/login");
    }
  };

  return (
    <nav className="bg-gray-950 border-b border-gray-200 h-12 flex items-center justify-end px-4">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            className="rounded-full p-1 hover:bg-gray-800 transition-colors"
            aria-label="User menu"
            type="button"
          >
            <CircleUserRound color="#ffffff" className="h-8 w-8" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="mt-2 w-full text-white rounded-md bg-gray-950"
          align="end"
        >
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
