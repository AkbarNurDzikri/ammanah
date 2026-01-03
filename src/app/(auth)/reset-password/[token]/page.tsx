"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useResetPassword } from "./hooks/use-reset-password";
import { ResetPasswordForm } from "./components/reset-password-form";
import { ValidateProcess } from "./components/validate-process";
import { ValidateFailed } from "./components/validate-failed";

export default function ResetPasswordPage() {
  const { validating, isValid, email } = useResetPassword();

  if (validating) {
    return <ValidateProcess />;
  }

  if (!isValid) {
    return <ValidateFailed />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-black">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Reset Password
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Enter your new password for <strong>{email}</strong>
            </p>
          </div>

          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
