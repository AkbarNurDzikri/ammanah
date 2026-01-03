import { useMutation } from "@tanstack/react-query";
import { toggleUserStatusAction } from "../actions/toggle-user-status.action";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/store/useModalStore";

export function useToggleActivateMutation(isActive: boolean, userName: string) {
  const queryClient = useQueryClient();
  const closeModal = useModalStore((s) => s.onClose);

  const { mutate, isPending } = useMutation({
    mutationFn: async (userId: string) => {
      const res = await toggleUserStatusAction(userId);
      if (res.error) throw new Error(res.error);
      return res;
    },
    onMutate: () => {
      return toast.loading(
        `${isActive ? "Deactivating" : "Activating"} user...`
      );
    },
    onSuccess: (data, variables, context) => {
      toast.success(
        `${userName} has been ${data.isActive ? "activated" : "deactivated"}!`,
        { id: context }
      );
      queryClient.invalidateQueries({ queryKey: ["datatable", "user"] });
    },
    onError: (error: any, variables, context) => {
      toast.error(error.message || "An unexpected error occurred", {
        id: context,
      });
    },
    onSettled: () => {
      closeModal();
    },
  });

  return {
    mutate,
    isPending,
  };
}
