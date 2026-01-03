"use client";

import { Shield, Loader2 } from "lucide-react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useUserRole } from "../hooks/use-user-role";

interface UserRoleFormProps {
  userId: string;
}

export function UserRoleForm({ userId }: UserRoleFormProps) {
  const { form, roles, loading, saving, toggleRole, onSubmit, onClose } =
    useUserRole(userId);

  if (loading) {
    return (
      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="flex justify-center p-10">
          <Loader2 className="animate-spin text-emerald-500" size={32} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Assign User Roles
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
          <CardContent className="px-0">
            <FormField
              control={form.control}
              name="roleIds"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-1 gap-2">
                    {roles.map((role) => {
                      const isSelected = field.value.includes(role.id);
                      return (
                        <Card
                          key={role.id}
                          onClick={() => toggleRole(role.id)}
                          className={cn(
                            "p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between shadow-none",
                            isSelected
                              ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10"
                              : "border-zinc-100 dark:border-zinc-800 hover:border-zinc-200"
                          )}
                        >
                          <div>
                            <p className="font-bold text-zinc-900 dark:text-zinc-100">
                              {role.name}
                            </p>
                            <p className="text-sm text-zinc-500">
                              {role.description}
                            </p>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                              <Shield size={14} className="text-white" />
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="px-0 gap-2 pt-4 border-t border-zinc-300 dark:border-zinc-800">
            <Button
              type="submit"
              disabled={saving}
              className="flex-1 font-bold rounded-2xl shadow-lg shadow-emerald-100 dark:shadow-none flex items-center justify-center gap-2 hover:cursor-pointer w-1/2"
              size={`lg`}
            >
              {saving && <Loader2 className="animate-spin" size={20} />}
              Save Selection
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1 font-bold rounded-2xl hover:cursor-pointer w-1/2"
              size={`lg`}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
