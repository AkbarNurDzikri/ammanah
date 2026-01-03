"use client";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createKK, updateKK, deleteKK, getKKs } from "../actions/kk.actions";
import { getRumahs } from "../../rumah/actions/rumah.actions";
import { toast } from "sonner";
import { KKSchema } from "../schemas/kk.schema";

export function useKKMutation() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data: KKSchema) => createKK(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "kK"] });
      queryClient.invalidateQueries({ queryKey: ["kk-options"] });
      toast.success("Data Kartu Keluarga berhasil disimpan");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menyimpan data Kartu Keluarga");
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: KKSchema }) =>
      updateKK(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "kK"] });
      queryClient.invalidateQueries({ queryKey: ["kk-options"] });
      toast.success("Data Kartu Keluarga berhasil diubah");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal mengubah data Kartu Keluarga");
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteKK(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "kK"] });
      queryClient.invalidateQueries({ queryKey: ["kk-options"] });
      toast.success("Data Kartu Keluarga berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus data Kartu Keluarga");
    },
  });

  return { create, update, remove };
}

export function useRumahOptions() {
  return useQuery({
    queryKey: ["rumah-options"],
    queryFn: async () => {
      const rumahs = await getRumahs();
      return rumahs.map((r) => ({
        label: `${r.nomor} - ${r.gang.nama}`,
        value: r.id,
      }));
    },
  });
}
