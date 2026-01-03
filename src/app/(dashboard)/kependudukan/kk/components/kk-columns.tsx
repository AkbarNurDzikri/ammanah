"use client";

import { useMemo } from "react";
import { DataTableColumn } from "@/components/ui/data-table/types";
import { KKWithRelations } from "../types";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import { DeleteButton } from "@/components/ui/delete-button";
import { INCOME_LABELS } from "@/config/kependudukan";
import { useGlobalModal } from "@/components/ui/global-modal";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";
import KKForm from "./kk-form";
import KKDetails from "./kk-details";
import { useAuthStore } from "@/store/useAuthStore";

export const useKKColumns = (): DataTableColumn<KKWithRelations>[] => {
  const { openModal } = useGlobalModal();
  const hasEditPerm = useAuthStore((s) => s.hasPermission("kk:edit"));
  const hasDeletePerm = useAuthStore((s) => s.hasPermission("kk:delete"));
  const hasViewDetailPerm = useAuthStore((s) => s.hasPermission("kk:detail"));

  return useMemo(
    () => [
      {
        key: "nomorKK",
        header: "Nomor KK",
        sortable: true,
      },
      {
        key: "kepalaKeluarga",
        header: "Kepala Keluarga",
        render: (row) => {
          const kepala = row.penduduk?.find(
            (p) => p.hubunganKeluarga === "KEPALA_KELUARGA"
          );
          return (
            <div className="flex flex-col">
              <span className="font-bold text-xs">{kepala?.nama || "-"}</span>
              {kepala && (
                <span className="text-[10px] text-zinc-500">{kepala.nik}</span>
              )}
            </div>
          );
        },
      },
      {
        key: "_count",
        header: "Anggota",
        render: (row) => (
          <Badge
            variant="secondary"
            className="font-bold border-none bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"
          >
            {row._count?.penduduk || 0} Jiwa
          </Badge>
        ),
      },
      {
        key: "pendapatan",
        header: "Pendapatan",
        render: (row) => {
          const kepala = row.penduduk?.find(
            (p) => p.hubunganKeluarga === "KEPALA_KELUARGA"
          );
          return (
            <div className="flex items-center gap-1.5">
              <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600">
                <Wallet size={12} />
              </div>
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {kepala?.penghasilanRange
                  ? INCOME_LABELS[kepala.penghasilanRange]
                  : "-"}
              </span>
            </div>
          );
        },
      },
      {
        key: "rumah",
        header: "Alamat / Rumah",
        render: (row) => (
          <div className="flex flex-col">
            <span className="font-bold text-xs">
              Rumah No. {row.rumah.nomor}
            </span>
            <span className="text-[10px] text-zinc-500">
              {row.rumah.gang.nama}
            </span>
          </div>
        ),
      },
      {
        key: "alamat",
        header: "Keterangan",
        render: (row) => (
          <span className="text-xs text-zinc-500 line-clamp-1 max-w-[150px]">
            {row.alamat || "-"}
          </span>
        ),
      },
      {
        key: "actions",
        header: "Aksi",
        render: (row) => {
          return (
            <div className="flex items-center gap-2">
              {hasViewDetailPerm && (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-colors border-zinc-200 dark:border-zinc-800"
                  onClick={() =>
                    openModal({
                      title: "Profil Keluarga",
                      description: `Daftar anggota keluarga No. KK ${row.nomorKK}`,
                      content: <KKDetails data={row} />,
                      className: "max-w-4xl",
                    })
                  }
                >
                  <Eye size={16} />
                </Button>
              )}

              {hasEditPerm && (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors border-zinc-200 dark:border-zinc-800"
                  onClick={() =>
                    openModal({
                      title: "Edit Kartu Keluarga",
                      description: "Ubah informasi nomor KK atau domisili",
                      content: <KKForm initialData={row} />,
                      className: "max-w-2xl",
                    })
                  }
                >
                  <Edit size={16} className="text-blue-600" />
                </Button>
              )}

              {hasDeletePerm && (
                <DeleteButton
                  model="kK"
                  id={row.id}
                  target={`KK No. ${row.nomorKK}`}
                />
              )}
            </div>
          );
        },
      },
    ],
    [openModal, hasEditPerm, hasDeletePerm]
  );
};
