"use server";

import { PasswordResetForm } from "@/components/password-reset-form";
import { redirect } from "next/navigation";

interface UpdatePasswordPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const UpdatePasswordPage = async ({
  searchParams,
}: UpdatePasswordPageProps) => {
  if (!searchParams.token_hash || !searchParams.type) {
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
