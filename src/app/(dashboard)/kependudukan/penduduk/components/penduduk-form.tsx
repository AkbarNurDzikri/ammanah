"use client";

import { useWatch } from "react-hook-form";

import {
  FormInput,
  FormSelect,
  FormDatePicker,
  FormSwitch,
  FormTextArea,
} from "@/components/ui/form-controls";
import { FormCombobox } from "@/components/ui/form-combobox";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PendudukWithRelations } from "../types";
import { usePendudukForm } from "../hooks/use-penduduk-form";

interface PendudukFormProps {
  initialData?: PendudukWithRelations;
}

export default function PendudukForm({ initialData }: PendudukFormProps) {
  const { form, onSubmit, options, isPending, closeModal } =
    usePendudukForm(initialData);

  const isKtpSesuaiDomisili = useWatch({
    control: form.control,
    name: "isKtpSesuaiDomisili",
  });

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            form={form}
            name="nik"
            label="NIK (16 Digit)"
            placeholder="35123..."
            type="number"
          />
          <FormInput
            form={form}
            name="nama"
            label="Nama Lengkap"
            placeholder="Sesuai KTP"
          />

          <FormInput form={form} name="tempatLahir" label="Tempat Lahir" />
          <FormDatePicker
            form={form}
            name="tanggalLahir"
            label="Tanggal Lahir"
          />

          <FormSelect
            form={form}
            name="jenisKelamin"
            label="Jenis Kelamin"
            options={options.jenisKelamin}
          />
          <FormSelect
            form={form}
            name="golonganDarah"
            label="Golongan Darah"
            options={options.golonganDarah}
          />

          <FormSelect
            form={form}
            name="agama"
            label="Agama"
            options={options.agama}
          />
          <FormSelect
            form={form}
            name="statusKawin"
            label="Status Perkawinan"
            options={options.statusKawin}
          />

          <FormSelect
            form={form}
            name="pendidikan"
            label="Pendidikan Terakhir"
            options={options.pendidikan}
          />
          <FormCombobox
            form={form}
            name="pekerjaan"
            label="Pekerjaan"
            options={options.pekerjaan}
            placeholder="Pilih atau ketik pekerjaan..."
          />

          <FormSelect
            form={form}
            name="hubunganKeluarga"
            label="Hubungan Keluarga"
            options={options.hubunganKeluarga}
          />
          <FormSelect
            form={form}
            name="penghasilanRange"
            label="Rentang Penghasilan"
            options={options.penghasilanRange}
            description="Untuk klasifikasi bantuan sosial"
          />

          <FormInput form={form} name="ayahKandung" label="Nama Ayah Kandung" />
          <FormInput form={form} name="ibuKandung" label="Nama Ibu Kandung" />
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <h3 className="font-bold text-emerald-600">Alamat & Domisili</h3>
          <FormCombobox
            form={form}
            name="kkId"
            label="Pilih Kartu Keluarga (Rumah)"
            options={options.kk}
            placeholder="Cari No KK atau Alamat Rumah..."
            allowCustom={false}
          />

          <FormSwitch
            form={form}
            name="isKtpSesuaiDomisili"
            label="Alamat KTP sesuai Domisili saat ini?"
          />

          {!isKtpSesuaiDomisili && (
            <FormTextArea
              form={form}
              name="alamatKtp"
              label="Alamat sesuai KTP (Sebelum Pindah)"
              placeholder="Jl. Raya No. 123..."
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
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
            disabled={isPending}
          >
            {initialData ? "Simpan Perubahan" : "Tambah Penduduk"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
