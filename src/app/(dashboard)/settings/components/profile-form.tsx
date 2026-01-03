"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  type ProfileFormValues,
} from "../schemas/settings-schema";
import { FormInput } from "@/components/ui/form-controls";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { updateProfileAction } from "../actions/update-profile.action";
import { useState } from "react";
import { toast } from "sonner";
import { User, Loader2 } from "lucide-react";

interface ProfileFormProps {
  initialName?: string | null;
}

export function ProfileForm({ initialName }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialName || "",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    setLoading(true);
    const result = await updateProfileAction(values);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.success);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <User className="text-emerald-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Personal Information
          </h3>
          <p className="text-sm text-zinc-500">
            Update your display name and public details.
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
            name="name"
            label="Full Name"
            placeholder="Enter your name"
            disabled={loading}
          />
          <Button
            type="submit"
            className="rounded-xl w-full md:w-auto px-8 bg-emerald-600 hover:bg-emerald-700 text-white hover:cursor-pointer"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
