import { useMutation } from "@tanstack/react-query";
import { requestPasswordReset } from "../actions/forgot-password.action";
import { ForgotPasswordValues } from "../schemas";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";

export function useForgotPasswordMutation(
  setEmailSent: Dispatch<SetStateAction<boolean>>
) {
  return useMutation({
    mutationFn: async (values: ForgotPasswordValues) => {
      return await requestPasswordReset(values.email);
    },
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        setEmailSent(true);
        toast.success("Password reset link sent to your email!");
      }
    },
    onError: (error) => {
      toast.error("Something went wrong");
    },
  });
}
