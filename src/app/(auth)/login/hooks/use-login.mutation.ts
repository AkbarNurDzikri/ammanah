import { useMutation } from "@tanstack/react-query";
import { loginAction } from "../actions/login.action";
import { LoginValues } from "../schemas/login.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Dispatch, SetStateAction } from "react";

export function useLoginMutation(
  setShowResend: Dispatch<SetStateAction<boolean>>
) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (values: LoginValues) => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      return await loginAction(formData);
    },
    onSuccess: (result) => {
      if (result.error) {
        toast.error(result.error);
        if (result.error === "Please verify your email before logging in.") {
          setShowResend(true);
        }
      } else if (result.success && result.user) {
        setAuth(result.user);
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
}
