import { PasswordResetRequestForm } from "@/components/password-reset-request-form";

const ForgotPasswordPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <PasswordResetRequestForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
