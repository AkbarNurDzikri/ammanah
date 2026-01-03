"use client";

import { useMemo } from "react";
import { DataTableColumn } from "@/components/ui/data-table/types";
import type { MutasiPenduduk, Penduduk } from "@prisma/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { DeleteButton } from "@/components/ui/delete-button";
import { useGlobalModal } from "@/components/ui/global-modal";
import MutasiForm from "../../penduduk/components/mutasi-form";
import { useAuthStore } from "@/store/useAuthStore";

type MutasiWithPenduduk = MutasiPenduduk & {
  penduduk: Penduduk;
};

export const useMutasiColumns = (): DataTableColumn<MutasiWithPenduduk>[] => {
  const { openModal } = useGlobalModal();
  const hasEditPerm = useAuthStore((s) => s.hasPermission("mutasi:edit"));
  const hasDeletePerm = useAuthStore((s) => s.hasPermission("mutasi:delete"));

  return useMemo(
    () => [
      {
        key: "penduduk",
        header: "Nama Penduduk",
        render: (row) => (
          <div className="flex flex-col">
            <span className="font-bold text-xs">{row.penduduk.nama}</span>
            <span className="text-[10px] text-zinc-500">
              {row.penduduk.nik}
            </span>
          </div>
        ),
      },
      {
        key: "jenis",
        header: "Jenis Mutasi",
        render: (row) => (
          <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-zinc-100 text-zinc-700">
            {row.jenis.replace(/_/g, " ")}
          </span>
        ),
      },
      {
        key: "tanggal",
        header: "Tanggal",
        render: (row) =>
          format(new Date(row.tanggal), "dd MMMM yyyy", { locale: id }),
      },
      {
        key: "alasan",
        header: "Alasan",
      },
      { key: "keterangan", header: "Keterangan Tambahan" },
      {
        key: "actions",
        header: "Aksi",
        render: (row) => (
          <div className="flex items-center gap-2">
            {hasEditPerm && (
              <Button
                variant="outline"
                size="icon"
                className="rounded-xl"
                onClick={() =>
                  openModal({
                    title: "Edit Mutasi",
                    description: "Ubah data peristiwa kependudukan",
                    content: <MutasiForm initialData={row} />,
                  })
                }
              >
                <Edit size={16} className="text-emerald-600" />
              </Button>
            )}
            {hasDeletePerm && (
              <DeleteButton
                model="mutasiPenduduk"
                id={row.id}
                target={`Mutasi ${row.penduduk.nama}`}
              />
            )}
          </div>
        ),
      },
    ],
    [openModal, hasEditPerm, hasDeletePerm]
  );
};
