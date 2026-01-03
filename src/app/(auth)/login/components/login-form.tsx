"use client";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-controls";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLoginForm } from "../hooks/use-login.form";
import { ResendVerification } from "./resend-verification";
import { useLoginMutation } from "../hooks/use-login.mutation";

export default function LoginForm() {
  const [mounted, setMounted] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const { form } = useLoginForm();
  const { mutate, isPending } = useLoginMutation(setShowResend);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-full" />
        <div className="h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-full" />
        <div className="h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-full mt-6" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <FormInput
            name="email"
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            form={form}
            disabled={isPending}
          />
          <div className="space-y-1">
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              form={form}
              disabled={isPending}
            />
            <div className="flex justify-end px-1">
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          size={`lg`}
          disabled={isPending}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 transition-all shadow-lg shadow-emerald-200 dark:shadow-none flex items-center justify-center gap-2 hover:cursor-pointer"
        >
          {isPending && <Loader2 className="animate-spin" size={20} />}
          Sign In
        </Button>

        <div className="text-center text-sm -mt-2 space-y-3">
          <div>
            <span className="text-zinc-500 dark:text-zinc-400">
              Don't have an account?{" "}
            </span>
            <Link
              href="/register"
              className="font-semibold text-emerald-600 hover:text-emerald-500"
            >
              Register
            </Link>
          </div>

          {showResend && <ResendVerification email={form.getValues("email")} />}
        </div>
      </form>
    </Form>
  );
}
