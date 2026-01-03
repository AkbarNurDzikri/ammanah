"use client";

import { useWatch } from "react-hook-form";

import {
  FormInput,
  FormTextArea,
  FormSwitch,
} from "@/components/ui/form-controls";
import { FormCombobox } from "@/components/ui/form-combobox";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import type { KK } from "@prisma/client";
import { useKKForm } from "../hooks/use-kk-form";

interface KKFormProps {
  initialData?: KK;
}

export default function KKForm({ initialData }: KKFormProps) {
  const { form, onSubmit, options, isPending, closeModal } =
    useKKForm(initialData);

  const isAlamatSesuaiDomisili = useWatch({
    control: form.control,
    name: "isAlamatSesuaiDomisili",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-10">
        <div className="space-y-4">
          <FormInput
            form={form}
            name="nomorKK"
            label="Nomor Kartu Keluarga (16 Digit)"
            placeholder="Contoh: 3512345678901234"
            type="number"
          />

          <FormCombobox
            form={form}
            name="rumahId"
            label="Pilih Rumah (Domisili)"
            options={options.rumah}
            placeholder="Cari Nomor Rumah..."
          />

          <FormSwitch
            form={form}
            name="isAlamatSesuaiDomisili"
            label="KK sesuai domisili rumah?"
            description="Jika tidak dicentang, wajib mengisi alamat lengkap sesuai KK"
          />

          {!isAlamatSesuaiDomisili && (
            <FormTextArea
              form={form}
              name="alamat"
              label="Alamat Lengkap (Sesuai KK)"
              placeholder="Jl. Raya Desa No. 123..."
            />
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 sticky bottom-0 bg-white dark:bg-zinc-950 py-4 border-t">
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
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={isPending}
          >
            {initialData ? "Simpan Perubahan" : "Tambah KK"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
