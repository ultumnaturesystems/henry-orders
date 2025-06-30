"use server";

import { PasswordResetForm } from "@/components/password-reset-form";
import { redirect } from "next/navigation";

interface UpdatePasswordPageProps {
  searchParams: Promise<{ token_hash?: string; type?: string }>;
}

const UpdatePasswordPage = async ({
  searchParams,
}: UpdatePasswordPageProps) => {
  const { token_hash, type } = await searchParams;
  if (!token_hash || !type) {
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
