"use client";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  createGang,
  updateGang,
  deleteGang,
  assignKetuaGang,
} from "../actions/gang.actions";
import { getPendudukOptions } from "../../penduduk/actions/penduduk.actions";
import { toast } from "sonner";
import { GangSchema } from "../schemas/gang.schema";

// ... (existing useGangMutation)

export function usePendudukOptions() {
  return useQuery({
    queryKey: ["penduduk-options"],
    queryFn: () => getPendudukOptions(),
  });
}

export function useGangMutation() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data: GangSchema) => createGang(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "gang"] });
      toast.success("Gang berhasil dibuat");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal membuat gang");
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: GangSchema }) =>
      updateGang(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "gang"] });
      toast.success("Gang berhasil diubah");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal mengubah gang");
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteGang(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "gang"] });
      toast.success("Gang berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus gang");
    },
  });

  const assignKetua = useMutation({
    mutationFn: ({
      gangId,
      pendudukId,
    }: {
      gangId: string;
      pendudukId: string | null;
    }) => assignKetuaGang(gangId, pendudukId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "gang"] });
      toast.success("Ketua gang berhasil diperbarui");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal memperbarui ketua gang");
    },
  });

  return { create, update, remove, assignKetua };
}
