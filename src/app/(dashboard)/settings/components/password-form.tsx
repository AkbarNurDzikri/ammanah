"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordSchema,
  type PasswordFormValues,
} from "../schemas/settings-schema";
import { FormInput } from "@/components/ui/form-controls";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { updatePasswordAction } from "../actions/update-password.action";
import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, Loader2 } from "lucide-react";

export function PasswordForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: PasswordFormValues) => {
    setLoading(true);
    const result = await updatePasswordAction(values);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.success);
      form.reset();
    }
  };

  return (
    <div className="space-y-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <ShieldCheck className="text-blue-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Security
          </h3>
          <p className="text-sm text-zinc-500">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-md"
        >
          <FormInput
            form={form}
            name="oldPassword"
            label="Current Password"
            type="password"
            placeholder="••••••••"
            disabled={loading}
          />
          <FormInput
            form={form}
            name="newPassword"
            label="New Password"
            type="password"
            placeholder="••••••••"
            disabled={loading}
          />
          <FormInput
            form={form}
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            disabled={loading}
          />
          <Button
            type="submit"
            className="rounded-xl w-full md:w-auto px-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:cursor-pointer"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
