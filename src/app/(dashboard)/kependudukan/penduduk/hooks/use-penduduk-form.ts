"use client";

import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pendudukSchema, PendudukSchema } from "../schemas/penduduk.schema";
import { usePendudukMutation, useKKOptions } from "./use-penduduk";
import { useGlobalModal } from "@/components/ui/global-modal";
import { PendudukWithRelations } from "../types";
import {
  JenisKelamin,
  GolonganDarah,
  Agama,
  HubunganKeluarga,
  StatusKawin,
  PenghasilanRange,
  Pendidikan,
  StatusPenduduk,
} from "@/types/prisma-enums";
import { PEKERJAAN_OPTIONS } from "@/config/kependudukan";

export function usePendudukForm(initialData?: PendudukWithRelations): {
  form: UseFormReturn<PendudukSchema>;
  onSubmit: SubmitHandler<PendudukSchema>;
  options: any;
  isPending: boolean;
  closeModal: () => void;
} {
  const { create, update } = usePendudukMutation();
  const { closeModal } = useGlobalModal();
  const { data: kkOptions = [] } = useKKOptions();

  const form = useForm<PendudukSchema>({
    resolver: zodResolver(pendudukSchema),
    defaultValues: {
      nik: initialData?.nik || "",
      nama: initialData?.nama || "",
      tempatLahir: initialData?.tempatLahir || "",
      tanggalLahir: initialData?.tanggalLahir
        ? new Date(initialData.tanggalLahir)
        : undefined,
      jenisKelamin: initialData?.jenisKelamin || JenisKelamin.LAKI_LAKI,
      golonganDarah: initialData?.golonganDarah || null,
      agama: initialData?.agama || Agama.ISLAM,
      pendidikan: initialData?.pendidikan || null,
      pekerjaan: initialData?.pekerjaan || null,
      statusKawin: initialData?.statusKawin || null,
      hubunganKeluarga:
        initialData?.hubunganKeluarga || HubunganKeluarga.KEPALA_KELUARGA,
      penghasilan: initialData?.penghasilan
        ? Number(initialData.penghasilan)
        : null,
      penghasilanRange: initialData?.penghasilanRange || null,
      ayahKandung: initialData?.ayahKandung || "",
      ibuKandung: initialData?.ibuKandung || "",
      isKtpSesuaiDomisili: initialData?.isKtpSesuaiDomisili ?? true,
      alamatKtp: initialData?.alamatKtp || "",
      kkId: initialData?.kkId || "",
      status: initialData?.status || StatusPenduduk.AKTIF,
    },
  });

  const onSubmit: SubmitHandler<PendudukSchema> = async (data) => {
    try {
      if (initialData) {
        await update.mutateAsync({ id: initialData.id, data });
      } else {
        await create.mutateAsync(data);
      }
      closeModal();
    } catch (error) {
      // Error is handled by mutation onError callbacks
    }
  };

  const enumToOptions = (
    e: Record<string, string>,
    customLabels?: Record<string, string>
  ) =>
    Object.values(e).map((v) => ({
      label: customLabels?.[v] || v.replace(/_/g, " "),
      value: v,
    }));

  const bloodTypeLabels: Record<string, string> = {
    [GolonganDarah.A_POSITIF]: "A+",
    [GolonganDarah.A_NEGATIF]: "A-",
    [GolonganDarah.B_POSITIF]: "B+",
    [GolonganDarah.B_NEGATIF]: "B-",
    [GolonganDarah.AB_POSITIF]: "AB+",
    [GolonganDarah.AB_NEGATIF]: "AB-",
    [GolonganDarah.O_POSITIF]: "O+",
    [GolonganDarah.O_NEGATIF]: "O-",
    [GolonganDarah.TIDAK_TAHU]: "Tidak Tahu",
  };

  const options = {
    jenisKelamin: enumToOptions(JenisKelamin),
    golonganDarah: enumToOptions(GolonganDarah, bloodTypeLabels),
    agama: enumToOptions(Agama),
    statusKawin: enumToOptions(StatusKawin),
    pendidikan: enumToOptions(Pendidikan),
    pekerjaan: PEKERJAAN_OPTIONS,
    hubunganKeluarga: enumToOptions(HubunganKeluarga),
    penghasilanRange: enumToOptions(PenghasilanRange),
    kk: kkOptions,
  };

  return {
    form,
    onSubmit,
    options,
    isPending: create.isPending || update.isPending,
    closeModal,
  };
}
