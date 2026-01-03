import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { deleteData, PrismaModelName } from "@/lib/datatable-server";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/store/useModalStore";

interface DeleteButtonProps {
  model: PrismaModelName;
  id: string;
  target: string;
  className?: string;
}

export const DeleteButton = ({
  model,
  id,
  target,
  className,
}: DeleteButtonProps) => {
  const queryClient = useQueryClient();
  const onOpen = useModalStore((s) => s.onOpen);
  const onClose = useModalStore((s) => s.onClose);

  const { mutate: handleDelete, isPending: loading } = useMutation({
    mutationFn: async () => {
      const res = await deleteData(model, id);
      if (res.error) throw new Error(res.error);
      return res;
    },
    onMutate: () => {
      return toast.loading(`Deleting ${model}...`);
    },
    onSuccess: (data, variables, context) => {
      toast.success(`${target} deleted successfully!`, { id: context });
      queryClient.invalidateQueries({ queryKey: ["datatable", model] });
      onClose();
    },
    onError: (error: any, variables, context) => {
      toast.error(error.message || "An unexpected error occurred", {
        id: context,
      });
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "bg-red-100 text-red-500 hover:bg-red-500 hover:text-white",
        className
      )}
      title={`Delete ${target}`}
      onClick={() =>
        onOpen({
          title: "Confirm Deletion",
          content: (
            <>
              <h3 className="font-semibold">Are you absolutely sure?</h3>
              <p className="text-muted-foreground">
                This action cannot be undone. This will permanently delete{" "}
                <strong>{target}</strong> from the database.
              </p>

              <div className="flex items-center justify-end gap-2 mt-3">
                <Button
                  variant="destructive"
                  onClick={() => handleDelete()}
                  disabled={loading}
                  className=""
                >
                  {loading && <Loader2 className="animate-spin" size={18} />}
                  Delete
                </Button>

                <Button variant="outline" onClick={onClose} className="">
                  Cancel
                </Button>
              </div>
            </>
          ),
        })
      }
    >
      <Trash2 size={18} />
    </Button>
  );
};
