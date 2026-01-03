"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { handleResendVerification } from "../utils/handle-resend-verification";
import { useState } from "react";

interface Props {
  email: string;
}

export function VerifyEmailSuccess({ email }: Props) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-black font-sans">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription className="text-base">
            We sent a verification link to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Click the link in the email to activate your account. If you don't
            see it, check your spam folder.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          {sent ? (
            <div className="p-3 text-center text-sm bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 rounded-lg w-full">
              Email sent successfully!
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                handleResendVerification(email, setLoading, setSent)
              }
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Resend Verification Email
            </Button>
          )}

          <Link href="/login" className="w-full">
            <Button variant="ghost" className="w-full">
              Back to Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
