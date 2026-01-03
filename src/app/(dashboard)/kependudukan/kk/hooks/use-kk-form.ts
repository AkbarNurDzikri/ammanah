"use client";

import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kkSchema, KKSchema } from "../schemas/kk.schema";
import { useKKMutation, useRumahOptions } from "./use-kk";
import { useGlobalModal } from "@/components/ui/global-modal";
import { KK } from "@prisma/client";

export function useKKForm(initialData?: KK): {
  form: UseFormReturn<KKSchema>;
  onSubmit: SubmitHandler<KKSchema>;
  options: any;
  isPending: boolean;
  closeModal: () => void;
} {
  const { create, update } = useKKMutation();
  const { closeModal } = useGlobalModal();
  const { data: rumahOptions = [] } = useRumahOptions();

  const form = useForm<KKSchema>({
    resolver: zodResolver(kkSchema),
    defaultValues: {
      nomorKK: initialData?.nomorKK || "",
      rumahId: initialData?.rumahId || "",
      isAlamatSesuaiDomisili: initialData ? !initialData.alamat : true,
      alamat: initialData?.alamat || "",
    },
  });

  const onSubmit: SubmitHandler<KKSchema> = async (data) => {
    try {
      if (initialData) {
        await update.mutateAsync({ id: initialData.id, data });
      } else {
        await create.mutateAsync(data);
      }
      closeModal();
    } catch (error) {
      // Handled by onError
    }
  };

  return {
    form,
    onSubmit,
    options: {
      rumah: rumahOptions,
    },
    isPending: create.isPending || update.isPending,
    closeModal,
  };
}
