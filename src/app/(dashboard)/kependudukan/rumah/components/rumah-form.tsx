"use client";

import {
  FormInput,
  FormTextArea,
  FormSelect,
} from "@/components/ui/form-controls";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RumahWithRelations } from "../types";
import { useRumahForm } from "../hooks/use-rumah-form";

interface RumahFormProps {
  initialData?: RumahWithRelations;
}

export default function RumahForm({ initialData }: RumahFormProps) {
  const { form, onSubmit, options, isPending, closeModal } =
    useRumahForm(initialData);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          form={form}
          name="nomor"
          label="Nomor Rumah / Blok"
          placeholder="Contoh: A-12"
        />
        <FormSelect
          form={form}
          name="gangId"
          label="Pilih Gang"
          options={options.gang}
          placeholder="Pilih lokasi gang"
        />
        <FormSelect
          form={form}
          name="status"
          label="Status Rumah"
          options={options.status}
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
            {initialData ? "Simpan Perubahan" : "Tambah Rumah"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
