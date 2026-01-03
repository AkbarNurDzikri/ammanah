"use client";

import {
  useForm,
  SubmitHandler,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mutasiSchema, MutasiSchema } from "../schemas/penduduk.schema";
import { usePendudukMutation, usePendudukOptions } from "./use-penduduk";
import { useGlobalModal } from "@/components/ui/global-modal";
import { MutasiJenis, MutasiPenduduk } from "@prisma/client";

interface UseReturn {
  form: UseFormReturn<MutasiSchema>;
  onSubmit: SubmitHandler<MutasiSchema>;
  options: any;
  isPending: boolean;
  closeModal: () => void;
  currentMutationType: MutasiJenis;
}

export function useMutasiForm(
  pendudukId?: string,
  initialData?: MutasiPenduduk
): UseReturn {
  const { mutasi, updateMutasi } = usePendudukMutation();
  const { closeModal } = useGlobalModal();
  const { data: pendudukOptions = [] } = usePendudukOptions();

  const form = useForm<MutasiSchema>({
    resolver: zodResolver(mutasiSchema),
    defaultValues: {
      pendudukId: initialData?.pendudukId || pendudukId || "",
      jenis: initialData?.jenis || MutasiJenis.PINDAH_KELUAR,
      tanggal: initialData?.tanggal
        ? new Date(initialData.tanggal)
        : new Date(),
      alasan: initialData?.alasan || "",
      keterangan: initialData?.keterangan || "",
    },
  });

  const currentMutationType = useWatch({
    control: form.control,
    name: "jenis",
  });

  const onSubmit: SubmitHandler<MutasiSchema> = async (data) => {
    try {
      if (initialData) {
        await updateMutasi.mutateAsync({ id: initialData.id, data });
      } else {
        const finalPendudukId = pendudukId || data.pendudukId;
        if (finalPendudukId) {
          await mutasi.mutateAsync({ pendudukId: finalPendudukId, data });
        }
      }
      closeModal();
    } catch (error) {
      // Handled by onError
    }
  };

  const enumToOptions = (e: any) =>
    Object.values(e).map((v: any) => ({
      label: v.replace(/_/g, " "),
      value: v,
    }));

  return {
    form,
    onSubmit,
    options: {
      jenis: enumToOptions(MutasiJenis),
      penduduk: pendudukOptions,
    },
    isPending: mutasi.isPending,
    closeModal,
    currentMutationType,
  };
}
