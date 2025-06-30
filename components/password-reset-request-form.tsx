"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

import { forgotPassword } from "@/app/(auth)/forgot-password/actions";
import { useState } from "react";

export function PasswordResetRequestForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [emailSent, setEmailSent] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailSent(false);
    setInvalidEmail(false);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    await forgotPassword(email)
      .then(() => {
        setEmailSent(true);
      })
      .catch((error) => {
        setInvalidEmail(true);
        console.error("Error sending reset link:", error);
        // Optionally handle error (e.g., show error message)
      });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="email" required />
              </div>
              {emailSent ? (
                <ValidEmail />
              ) : (
                <>
                  <Button type="submit" className="w-full cursor-pointer">
                    Send Reset Link
                  </Button>
                  {invalidEmail && <InvalidEmail />}
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const ValidEmail = () => {
  return (
    <>
      <hr />
      <div className="flex  flex-col items-center gap-2 text-green-600">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>Email sent successfully!</span>
        </div>
        <span className="text-sm text-gray-500">
          Please check your inbox for the reset link.
        </span>
      </div>
    </>
  );
};

const InvalidEmail = () => {
  return (
    <>
      <hr />
      <div className="flex flex-col items-center gap-2 text-red-600">
        <span className="text-sm">Invalid email address.</span>
        <span className="text-sm text-gray-500">
          Please try again with a valid email.
        </span>
      </div>
    </>
  );
};
