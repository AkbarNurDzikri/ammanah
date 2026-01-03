"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@prisma/client";
import { AssignRoleButton } from "./assign-role-button";
import { ToggleActivateButton } from "./toggle-activate-button";

interface UserActionsCellProps {
  row: User;
}

export const UserActionsCell = ({ row }: UserActionsCellProps) => {
  const canAssignRole = useAuthStore((s) => s.hasPermission("user:assign"));
  const canActivateUser = useAuthStore((s) =>
    s.hasPermission("user:activation")
  );

  return (
    <div className="flex items-center gap-2">
      {canAssignRole && <AssignRoleButton row={row} />}

      {canActivateUser && (
        <ToggleActivateButton
          userId={row.id}
          isActive={row.isActive}
          userName={row.name || row.email}
        />
      )}
    </div>
  );
};
