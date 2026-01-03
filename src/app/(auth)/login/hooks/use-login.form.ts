"use client";

import { useForm } from "react-hook-form";
import { loginSchema, LoginValues } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useLoginForm() {
  const form = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  return { form };
}
