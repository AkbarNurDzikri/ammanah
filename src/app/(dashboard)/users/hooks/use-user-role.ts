"use client";

import { useState, useEffect } from "react";
import type { Role } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore } from "@/store/useModalStore";
import { userRoleSchema, UserRoleFormValues } from "@/schemas/user-role-schema";
import { getAllRolesAction } from "../actions/get-all-roles.action";
import { getUserRolesAction } from "../actions/get-user-roles.action";
import { assignRolesToUserAction } from "../actions/assign-roles-to-user.action";

export function useUserRole(userId: string) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const onClose = useModalStore((state) => state.onClose);

  const form = useForm<UserRoleFormValues>({
    resolver: zodResolver(userRoleSchema),
    defaultValues: {
      roleIds: [],
    },
  });

  useEffect(() => {
    async function fetchData() {
      const [rolesRes, userRolesRes] = await Promise.all([
        getAllRolesAction(),
        getUserRolesAction(userId),
      ]);

      if (rolesRes.success && rolesRes.roles) setRoles(rolesRes.roles);
      if (userRolesRes.success && userRolesRes.userRoles) {
        const initialRoleIds = userRolesRes.userRoles.map(
          (ur: any) => ur.roleId
        );
        form.reset({ roleIds: initialRoleIds });
      }
      setLoading(false);
    }
    fetchData();
  }, [userId, form]);

  const { mutate: onSubmit, isPending: saving } = useMutation({
    mutationFn: async (values: UserRoleFormValues) => {
      const res = await assignRolesToUserAction(userId, values.roleIds);
      if (res.error) throw new Error(res.error);
      return res;
    },
    onMutate: () => {
      return toast.loading("Updating user roles...");
    },
    onSuccess: (data, variables, context) => {
      toast.success("User roles updated successfully!", { id: context });
      queryClient.invalidateQueries({ queryKey: ["datatable", "user"] });
      onClose();
    },
    onError: (error: any, variables, context) => {
      toast.error(error.message || "Failed to update roles", { id: context });
    },
  });

  const toggleRole = (roleId: string) => {
    const currentPaths = form.getValues("roleIds");
    const newPaths = currentPaths.includes(roleId)
      ? currentPaths.filter((id) => id !== roleId)
      : [...currentPaths, roleId];
    form.setValue("roleIds", newPaths, { shouldValidate: true });
  };

  return {
    form,
    roles,
    loading,
    saving,
    toggleRole,
    onSubmit,
    onClose,
  };
}
