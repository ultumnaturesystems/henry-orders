"use server";

import { PasswordResetForm } from "@/components/password-reset-form";
import { redirect } from "next/navigation";

const UpdatePasswordPage = async () => {
  const searchParams = new URLSearchParams(
    typeof window === "undefined" ? "" : window.location.search
  ) as URLSearchParams;

  if (!searchParams.get("token_hash") || !searchParams.get("type")) {
    redirect("/");
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <PasswordResetForm />
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
