"use client";

import { FormInput, FormTextArea } from "@/components/ui/form-controls";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { GangWithRelations } from "../types";
import { FormCombobox } from "@/components/ui/form-combobox";
import { useGangForm } from "../hooks/use-gang-form";

interface GangFormProps {
  initialData?: GangWithRelations;
}

export default function GangForm({ initialData }: GangFormProps) {
  const { form, onSubmit, options, isPending, closeModal } =
    useGangForm(initialData);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          form={form}
          name="nama"
          label="Nama Gang"
          placeholder="Contoh: Gang Icarus"
        />
        <FormCombobox
          form={form}
          name="ketuaGangId"
          label="Ketua Gang"
          options={options.penduduk}
          placeholder="Pilih Ketua Gang..."
        />
        <FormTextArea
          form={form}
          name="keterangan"
          label="Keterangan"
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
            {initialData ? "Simpan Perubahan" : "Tambah Gang"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
