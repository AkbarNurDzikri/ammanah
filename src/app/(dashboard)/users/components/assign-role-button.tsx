import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/useModalStore";
import { User } from "@prisma/client";
import { Shield } from "lucide-react";
import { UserRoleForm } from "./user-role-form";

interface Props {
  row: User;
}

export function AssignRoleButton({ row }: Props) {
  const onOpen = useModalStore((s) => s.onOpen);

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() =>
        onOpen({
          title: `Assign Roles: ${row.name}`,
          description: "Select one or more roles for this user.",
          content: <UserRoleForm userId={row.id} />,
        })
      }
      className="font-bold flex items-center gap-2 dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white hover:cursor-pointer bg-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white"
    >
      <Shield size={16} />
      Assign Role
    </Button>
  );
}
