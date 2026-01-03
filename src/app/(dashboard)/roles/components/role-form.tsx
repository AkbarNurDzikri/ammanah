"use client";

import { Loader2 } from "lucide-react";
import { useModalStore } from "@/store/useModalStore";
import { FormInput, FormSwitch } from "@/components/ui/form-controls";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRoleForm } from "../hooks/use-role-form";
import { PERMISSIONS } from "@/config/permissions";
import { useRoleMutation } from "../hooks/use-role.mutation";

interface RoleFormProps {
  initialData?: any;
}

export function RoleForm({ initialData }: RoleFormProps) {
  const onClose = useModalStore((state) => state.onClose);
  const { mutate, isPending } = useRoleMutation(initialData);
  const { form } = useRoleForm({
    initialData,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          {initialData ? "Edit Role" : "Create New Role"}
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutate(data))}
          className="space-y-6"
        >
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Role Name"
                name="name"
                form={form}
                placeholder="e.g. Administrator"
              />
              <FormInput
                label="Description"
                name="description"
                form={form}
                placeholder="Brief description of the role"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-zinc-500 tracking-wider">
                Permissions Configuration
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PERMISSIONS.map((perm, i) => (
                  <Card
                    key={i}
                    className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-all group shadow-none w-full"
                  >
                    <FormSwitch
                      description={perm.description}
                      label={perm.name}
                      name={perm.name as any}
                      form={form}
                      className="border-0 p-0 flex-row items-start gap-2"
                    />
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="gap-3 pt-4 border-t border-zinc-300 dark:border-zinc-800">
            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="flex-1 font-bold rounded-2xl shadow-lg shadow-emerald-100 dark:shadow-none hover:cursor-pointer flex items-center justify-center gap-2"
            >
              {isPending && <Loader2 className="animate-spin" size={20} />}
              {initialData ? "Save Changes" : "Create Role"}
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={onClose}
              className="flex-1 font-bold rounded-2xl hover:cursor-pointer"
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
