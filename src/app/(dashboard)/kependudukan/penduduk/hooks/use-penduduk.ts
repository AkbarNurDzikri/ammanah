"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPenduduk,
  updatePenduduk,
  deletePenduduk,
  recordMutasi,
  updateMutasi,
  deleteMutasi,
  getPendudukOptions,
} from "../actions/penduduk.actions";
import { getKKs } from "../../kk/actions/kk.actions";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { PendudukSchema, MutasiSchema } from "../schemas/penduduk.schema";

export function usePendudukMutation() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data: PendudukSchema) => createPenduduk(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "penduduk"] });
      toast.success("Data penduduk berhasil disimpan");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menyimpan data penduduk");
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: PendudukSchema }) =>
      updatePenduduk(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "penduduk"] });
      toast.success("Data penduduk berhasil diubah");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal mengubah data penduduk");
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deletePenduduk(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "penduduk"] });
      toast.success("Data penduduk berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus data penduduk");
    },
  });

  const mutasi = useMutation({
    mutationFn: ({
      pendudukId,
      data,
    }: {
      pendudukId: string;
      data: MutasiSchema;
    }) => recordMutasi(pendudukId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "penduduk"] });
      queryClient.invalidateQueries({
        queryKey: ["datatable", "mutasiPenduduk"],
      });
      toast.success("Mutasi berhasil dicatat");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal mencatat mutasi");
    },
  });

  const updateMutasiMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: MutasiSchema }) =>
      updateMutasi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "penduduk"] });
      queryClient.invalidateQueries({
        queryKey: ["datatable", "mutasiPenduduk"],
      });
      toast.success("Mutasi berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memperbarui mutasi");
    },
  });

  const deleteMutasiMutation = useMutation({
    mutationFn: (id: string) => deleteMutasi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "penduduk"] });
      queryClient.invalidateQueries({
        queryKey: ["datatable", "mutasiPenduduk"],
      });
      toast.success("Mutasi berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus mutasi");
    },
  });

  return {
    create,
    update,
    remove,
    mutasi,
    updateMutasi: updateMutasiMutation,
    deleteMutasi: deleteMutasiMutation,
  };
}

export function useKKOptions() {
  return useQuery({
    queryKey: ["kk-options"],
    queryFn: async () => {
      const kks = await getKKs();
      return kks.map((kk) => ({
        label: `${kk.nomorKK} - Rumah ${kk.rumah.nomor} (${kk.rumah.gang.nama})`,
        value: kk.id,
      }));
    },
  });
}

export function usePendudukOptions() {
  return useQuery({
    queryKey: ["penduduk-options"],
    queryFn: () => getPendudukOptions(),
  });
}
