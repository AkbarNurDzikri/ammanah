import { useMutation } from "@tanstack/react-query";
import { RegisterValues } from "../schemas/register.schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerAction } from "../actions/register.action";

export function useRegisterMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: RegisterValues) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      return await registerAction(formData);
    },
    onSuccess: (result, variables) => {
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(
          "Account created! Please check your email for verification."
        );
        router.push(`/verify-email?email=${variables.email}`);
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
}
