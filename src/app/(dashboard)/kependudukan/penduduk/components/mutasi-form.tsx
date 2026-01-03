"use client";

import { Form } from "@/components/ui/form";
import {
  FormInput,
  FormTextArea,
  FormSelect,
  FormDatePicker,
} from "@/components/ui/form-controls";
import { FormCombobox } from "@/components/ui/form-combobox";
import { Button } from "@/components/ui/button";
import { useMutasiForm } from "../hooks/use-mutasi-form";
import type { MutasiPenduduk } from "@prisma/client";

interface MutasiFormProps {
  initialPendudukId?: string;
  initialData?: MutasiPenduduk & {
    penduduk?: { id: string; nama: string; nik: string };
  };
}

export default function MutasiForm({
  initialPendudukId,
  initialData,
}: MutasiFormProps) {
  const {
    form,
    onSubmit,
    options,
    isPending,
    closeModal,
    currentMutationType,
  } = useMutasiForm(initialPendudukId, initialData);

  const isEdit = !!initialData;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {!initialPendudukId && (
          <FormCombobox
            form={form}
            name="pendudukId"
            label="Pilih Penduduk"
            options={options.penduduk}
            placeholder="Cari penduduk..."
            allowCustom={false}
          />
        )}

        <FormSelect
          form={form}
          name="jenis"
          label="Jenis Mutasi"
          options={options.jenis}
        />

        <FormDatePicker form={form} name="tanggal" label="Tanggal Peristiwa" />

        {currentMutationType !== "PINDAH_DATANG" && (
          <FormInput
            form={form}
            name="alasan"
            label="Alasan"
            placeholder="Contoh: Pindah mengikuti orang tua, sakit, dll."
          />
        )}

        <FormTextArea
          form={form}
          name="keterangan"
          label="Keterangan Tambahan"
          placeholder="Opsional"
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={closeModal}
            className="rounded-xl"
          >
            Batal
          </Button>
          <Button
            type="submit"
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
            disabled={isPending}
          >
            {isEdit ? "Simpan Perubahan" : "Simpan Mutasi"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
