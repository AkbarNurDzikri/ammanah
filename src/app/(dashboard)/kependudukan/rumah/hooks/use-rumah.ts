"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRumah,
  updateRumah,
  deleteRumah,
} from "../actions/rumah.actions";
import { getGangs } from "../../gang/actions/gang.actions";
import { toast } from "sonner";
import { RumahSchema } from "../schemas/rumah.schema";

export function useRumahMutation() {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data: RumahSchema) => createRumah(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "rumah"] });
      toast.success("Rumah berhasil dibuat");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal membuat rumah");
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: RumahSchema }) =>
      updateRumah(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "rumah"] });
      toast.success("Rumah berhasil diubah");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal mengubah rumah");
    },
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteRumah(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["datatable", "rumah"] });
      toast.success("Rumah berhasil dihapus");
    },
    onError: (error: any) => {
      toast.error(error.message || "Gagal menghapus rumah");
    },
  });

  return { create, update, remove };
}

export function useGangOptions() {
  return useQuery({
    queryKey: ["gangs-options"],
    queryFn: async () => {
      const gangs = await getGangs();
      return gangs.map((g) => ({ label: g.nama, value: g.id }));
    },
  });
}
