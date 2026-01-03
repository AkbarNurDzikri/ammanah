"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleSchema, RoleFormValues } from "@/schemas/role-schema";
import { PERMISSIONS } from "@/config/permissions";

interface Props {
  initialData?: any;
}

export function useRoleForm({ initialData }: Props) {
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      ...Object.fromEntries(
        PERMISSIONS.map((p) => [
          p.name,
          initialData?.permissions?.some(
            (rp: any) => rp.permission.name === p.name
          ) || false,
        ])
      ),
    } as any,
  });

  return {
    form,
  };
}
