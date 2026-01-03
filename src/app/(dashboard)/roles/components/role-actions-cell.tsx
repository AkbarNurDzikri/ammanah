"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Role } from "@prisma/client";
import { RoleManageButton } from "./role-manage-button";
import { DeleteButton } from "@/components/ui/delete-button";

interface Props {
  row: Role;
}

export function RoleActionsCell({ row }: Props) {
  const canDeleteRole = useAuthStore((s) => s.hasPermission("role:delete"));
  const canManageRole = useAuthStore((s) => s.hasPermission("role:manage"));

  return (
    <div className="flex items-center gap-2">
      {canManageRole && <RoleManageButton row={row} />}

      {canDeleteRole && (
        <DeleteButton model="role" id={row.id} target={row.name} />
      )}
    </div>
  );
}
