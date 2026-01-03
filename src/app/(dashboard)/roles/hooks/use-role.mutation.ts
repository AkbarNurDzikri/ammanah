import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RoleFormValues } from "../types/role-types";
import { PERMISSIONS } from "@/config/permissions";
import { createOrUpdateRoleAction } from "../actions/create-or-update-role.action";
import { toast } from "sonner";
import { useModalStore } from "@/store/useModalStore";

export function useRoleMutation(initialData: any) {
  const queryClient = useQueryClient();
  const onClose = useModalStore((state) => state.onClose);
  return useMutation({
    mutationFn: async (values: RoleFormValues) => {
      // Prepare form data for server action
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);

      // Add permissions
      PERMISSIONS.forEach((p) => {
        formData.append(p.name, String((values as any)[p.name] || false));
      });

      const res = await createOrUpdateRoleAction(formData, initialData?.id);
      if (res.error) throw new Error(res.error);
      return res;
    },
    onMutate: () => {
      return toast.loading(
        initialData ? "Updating role..." : "Creating role..."
      );
    },
    onSuccess: (data, variables, context) => {
      toast.success(
        initialData
          ? "Role updated successfully!"
          : "Role created successfully!",
        { id: context }
      );
      queryClient.invalidateQueries({ queryKey: ["datatable", "role"] });
      onClose();
    },
    onError: (error: any, variables, context) => {
      toast.error(error.message || "Failed to save role", { id: context });
    },
  });
}
