import { useForm } from "react-hook-form";
import { registerSchema, RegisterValues } from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useRegisterForm() {
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return { form };
}
