"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-controls";
import { useForgotPasswordMutation } from "../hooks/use-forgot-password.mutation";
import { UseFormReturn } from "react-hook-form";
import { ForgotPasswordValues } from "../schemas";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  form: UseFormReturn<ForgotPasswordValues>;
  setEmailSent: Dispatch<SetStateAction<boolean>>;
}

export function ForgotPasswordForm({ form, setEmailSent }: Props) {
  const [mounted, setMounted] = useState(false);
  const { mutate, isPending } = useForgotPasswordMutation(setEmailSent);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-black">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="space-y-4 animate-pulse">
              <div className="h-20 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-full" />
              <div className="h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-full" />
              <div className="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-full mt-6" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-black">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Forgot Password?
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => mutate(data))}
              className="space-y-4"
            >
              <FormInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                form={form}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-lg shadow-emerald-200 dark:shadow-none flex items-center justify-center gap-2 hover:cursor-pointer"
              >
                {isPending && <Loader2 className="animate-spin" size={20} />}
                Send Reset Link
              </Button>

              <div className="text-center text-sm">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Remember your password?{" "}
                </span>
                <Link
                  href="/login"
                  className="font-semibold text-emerald-600 hover:text-emerald-500"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
