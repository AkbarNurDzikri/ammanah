import { useMutation } from "@tanstack/react-query";
import { resetPasswordAction } from "../actions/reset-password.action";
import { ResetPasswordValues } from "../schemas/reset-password.schema";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";

export function useResetPasswordMutation() {
  const router = useRouter();
  const params = useParams();

  return useMutation({
    mutationFn: async (values: ResetPasswordValues) => {
      const token = params.token as string;
      return await resetPasswordAction(token, values.password);
    },
    onSuccess: (result) => {
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Password reset successfully!");
        router.push("/login");
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
}
