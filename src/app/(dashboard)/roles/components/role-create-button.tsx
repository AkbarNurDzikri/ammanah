import { Button } from "@/components/ui/button";
import { useModalStore } from "@/store/useModalStore";
import { RoleForm } from "./role-form";

export function RoleCreateButton() {
  const onOpen = useModalStore((state) => state.onOpen);
  return (
    <Button
      onClick={() =>
        onOpen({
          title: "Create New Role",
          description: "Set up a new role with specific access.",
          content: <RoleForm />,
          className: "max-w-3/4",
        })
      }
      className="bg-emerald-600 text-white font-black transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-emerald-200 dark:shadow-none hover:cursor-pointer dark:hover:bg-white dark:hover:text-black"
    >
      Create Role
    </Button>
  );
}
