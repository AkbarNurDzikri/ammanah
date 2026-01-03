"use client";

import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form"; // Added UseFormReturn
import { zodResolver } from "@hookform/resolvers/zod";
import { rumahSchema, RumahSchema } from "../schemas/rumah.schema";
import { useRumahMutation, useGangOptions } from "./use-rumah";
import { useGlobalModal } from "@/components/ui/global-modal";
import { RumahWithRelations } from "../types";
import { StatusRumah } from "@/types/prisma-enums";

export function useRumahForm(initialData?: RumahWithRelations): {
  form: UseFormReturn<RumahSchema>;
  onSubmit: SubmitHandler<RumahSchema>;
  options: any;
  isPending: boolean;
  closeModal: () => void;
} {
  const { create, update } = useRumahMutation();
  const { closeModal } = useGlobalModal();
  const { data: gangOptions = [] } = useGangOptions();

  const form = useForm<RumahSchema>({
    resolver: zodResolver(rumahSchema),
    defaultValues: {
      nomor: initialData?.nomor || "",
      gangId: initialData?.gangId || "",
      status: initialData?.status || StatusRumah.DIHUNI,
      keterangan: initialData?.keterangan || "",
    },
  });

  const onSubmit: SubmitHandler<RumahSchema> = async (data) => {
    try {
      if (initialData) {
        await update.mutateAsync({ id: initialData.id, data });
      } else {
        await create.mutateAsync(data);
      }
      closeModal();
    } catch (error) {
      // Handled by onError in mutation
    }
  };

  const statusOptions = Object.values(StatusRumah).map((s) => ({
    label: s,
    value: s,
  }));

  const options = {
    gang: gangOptions,
    status: statusOptions,
  };

  return {
    form,
    onSubmit,
    options,
    isPending: create.isPending || update.isPending,
    closeModal,
  };
}
