"use client";

import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gangSchema, GangSchema } from "../schemas/gang.schema";
import { useGangMutation, usePendudukOptions } from "./use-gang";
import { useGlobalModal } from "@/components/ui/global-modal";
import { GangWithRelations } from "../types";

export function useGangForm(initialData?: GangWithRelations): {
  form: UseFormReturn<GangSchema>;
  onSubmit: SubmitHandler<GangSchema>;
  options: any;
  isPending: boolean;
  closeModal: () => void;
} {
  const { create, update } = useGangMutation();
  const { closeModal } = useGlobalModal();
  const { data: pendudukOptions = [] } = usePendudukOptions();

  const form = useForm<GangSchema>({
    resolver: zodResolver(gangSchema),
    defaultValues: {
      nama: initialData?.nama || "",
      keterangan: initialData?.keterangan || "",
      ketuaGangId: initialData?.ketuaGangId || null,
    },
  });

  const onSubmit: SubmitHandler<GangSchema> = async (data) => {
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

  const options = {
    penduduk: pendudukOptions,
  };

  return {
    form,
    onSubmit,
    options,
    isPending: create.isPending || update.isPending,
    closeModal,
  };
}
