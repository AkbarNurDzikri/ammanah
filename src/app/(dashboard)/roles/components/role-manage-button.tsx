"use client";

import { Button } from "@/components/ui/button";
import { Role } from "@prisma/client";
import { toast } from "sonner";
import { getRoleWithPermissionsAction } from "../actions/get-role-with-permissions.action";
import { useModalStore } from "@/store/useModalStore";
import { RoleForm } from "./role-form";

interface Props {
  row: Role;
}

export function RoleManageButton({ row }: Props) {
  const onOpen = useModalStore((state) => state.onOpen);

  const onEdit = async (role: Role) => {
    const toastId = toast.loading("Fetching role details...");
    try {
      const res = await getRoleWithPermissionsAction(role.id);
      if (res.error) {
        toast.error(res.error, { id: toastId });
        return;
      }

      toast.dismiss(toastId);
      onOpen({
        title: `Edit Role: ${role.name}`,
        description: "Update role details and configure its permissions.",
        className: "max-w-3/4",
        content: <RoleForm initialData={res.role} />,
      });
    } catch (err) {
      toast.error("Failed to load details", { id: toastId });
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => onEdit(row)}
      className="font-bold hover:cursor-pointer hover:bg-black hover:text-white"
    >
      Manage
    </Button>
  );
}
