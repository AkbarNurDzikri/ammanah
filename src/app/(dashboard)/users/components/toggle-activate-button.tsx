"use client";

import { Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToggleActivateMutation } from "../hooks/use-toggle-activate.mutation";
import { useModalStore } from "@/store/useModalStore";

interface ToggleActiveButtonProps {
  userId: string;
  isActive: boolean;
  userName: string;
  className?: string;
}

export const ToggleActivateButton = ({
  userId,
  isActive,
  userName,
  className,
}: ToggleActiveButtonProps) => {
  const onOpen = useModalStore((s) => s.onOpen);
  const onClose = useModalStore((s) => s.onClose);
  const { mutate, isPending } = useToggleActivateMutation(isActive, userName);
  const classButton = isActive
    ? "bg-orange-100 text-orange-500 hover:bg-orange-500 hover:text-white"
    : "bg-emerald-100 text-emerald-500 hover:bg-emerald-500 hover:text-white";

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "font-bold flex items-center gap-2 hover:cursor-pointer",
        classButton,
        className
      )}
      title={isActive ? "Deactivate user" : "Activate user"}
      onClick={() =>
        onOpen({
          title: "Toggle User Activation",
          content: (
            <>
              <h3 className="text-lg font-bold">
                {isActive ? "Deactivate" : "Activate"} User Account?
              </h3>
              {isActive ? (
                <p>
                  This will prevent <strong>{userName}</strong> from logging in.
                  You can reactivate this account anytime.
                </p>
              ) : (
                <p>
                  This will allow <strong>{userName}</strong> to log in to the
                  system again.
                </p>
              )}

              <div className="flex items-center justify-end gap-2 mt-3">
                <Button
                  size={`sm`}
                  onClick={() => mutate(userId)}
                  disabled={isPending}
                  className={cn(classButton, "hover:cursor-pointer")}
                >
                  {isActive ? "Deactivate" : "Activate"}
                </Button>

                <Button
                  variant={`secondary`}
                  size={`sm`}
                  onClick={() => onClose()}
                  disabled={isPending}
                  className={cn("hover:cursor-pointer")}
                >
                  Cancel
                </Button>
              </div>
            </>
          ),
        })
      }
    >
      <Power size={16} />
      {isActive ? "Deactivate" : "Activate"}
    </Button>
  );
};
