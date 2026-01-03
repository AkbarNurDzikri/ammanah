"use client";

import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form-controls";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRegisterForm } from "../hooks/use-register.form";
import { useRegisterMutation } from "../hooks/use-register.mutation";

export default function RegisterForm() {
  const [mounted, setMounted] = useState(false);
  const { form } = useRegisterForm();
  const { mutate, isPending } = useRegisterMutation();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-full" />
        <div className="h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl w-full" />
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
        <FormInput
          name="name"
          label="Full Name"
          placeholder="John Doe"
          form={form}
          disabled={isPending}
        />
        <FormInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          form={form}
          disabled={isPending}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          form={form}
          disabled={isPending}
        />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          form={form}
          disabled={isPending}
        />
        <Button
          type="submit"
          size={`lg`}
          disabled={isPending}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-200 dark:shadow-none flex items-center justify-center gap-2 hover:cursor-pointer"
        >
          {isPending && <Loader2 className="animate-spin" size={20} />}
          Create Account
        </Button>

        <div className="text-center text-sm -mt-3">
          <span className="text-zinc-500 dark:text-zinc-400">
            Already have an account?{" "}
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
  );
}
