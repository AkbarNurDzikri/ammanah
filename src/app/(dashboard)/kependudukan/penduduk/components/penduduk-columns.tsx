"use client";

import { useMemo } from "react";
import { DataTableColumn } from "@/components/ui/data-table/types";
import { PendudukWithRelations } from "../types";
import { Button } from "@/components/ui/button";
import { Edit, Eye, ArrowRightLeft } from "lucide-react";
import { DeleteButton } from "@/components/ui/delete-button";
import { useGlobalModal } from "@/components/ui/global-modal";
import PendudukForm from "./penduduk-form";
import PendudukDetails from "./penduduk-details";
import MutasiForm from "./mutasi-form";
import { StatusPenduduk, JenisKelamin } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const statusColors: Record<StatusPenduduk, string> = {
  [StatusPenduduk.AKTIF]:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  [StatusPenduduk.PINDAH]:
    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
  [StatusPenduduk.MENINGGAL]:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export const usePendudukColumns =
  (): DataTableColumn<PendudukWithRelations>[] => {
    const { openModal } = useGlobalModal();
    const hasEditPerm = useAuthStore((s) => s.hasPermission("penduduk:edit"));
    const hasDeletePerm = useAuthStore((s) =>
      s.hasPermission("penduduk:delete")
    );
    const hasDetailPerm = useAuthStore((s) =>
      s.hasPermission("penduduk:detail")
    );
    const hasMutasiPerm = useAuthStore((s) => s.hasPermission("mutasi:create"));

    return useMemo(
      () => [
        {
          key: "nik",
          header: "NIK",
          sortable: true,
        },
        {
          key: "nama",
          header: "Nama",
          sortable: true,
        },
        {
          key: "jenisKelamin",
          header: "L/P",
          render: (row) =>
            row.jenisKelamin === JenisKelamin.LAKI_LAKI ? "L" : "P",
        },
        {
          key: "kk",
          header: "No. KK / Rumah",
          render: (row) =>
            row.kk ? (
              <div className="flex flex-col">
                <span className="font-bold text-xs">{row.kk.nomorKK}</span>
                <span className="text-[10px] text-zinc-500">
                  {row.kk.rumah.gang.nama} No. {row.kk.rumah.nomor}
                </span>
              </div>
            ) : (
              "-"
            ),
        },
        {
          key: "hubunganKeluarga",
          header: "Hubungan",
          render: (row) => row.hubunganKeluarga.replace(/_/g, " "),
        },
        {
          key: "status",
          header: "Status",
          render: (row) => (
            <span
              className={cn(
                "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                statusColors[row.status]
              )}
            >
              {row.status}
            </span>
          ),
        },
        {
          key: "actions",
          header: "Aksi",
          render: (row) => {
            return (
              <div className="flex items-center gap-2">
                {hasDetailPerm && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl"
                    onClick={() =>
                      openModal({
                        title: "Detail Penduduk",
                        description: "Informasi profil lengkap penduduk",
                        content: <PendudukDetails data={row} />,
                        className: "max-w-2xl",
                      })
                    }
                  >
                    <Eye size={16} className="text-zinc-600" />
                  </Button>
                )}

                {hasMutasiPerm && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl"
                    onClick={() =>
                      openModal({
                        title: "Catat Mutasi",
                        description: `Catat peristiwa kependudukan untuk ${row.nama}`,
                        content: <MutasiForm initialPendudukId={row.id} />,
                      })
                    }
                  >
                    <ArrowRightLeft size={16} className="text-blue-600" />
                  </Button>
                )}

                {hasEditPerm && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl"
                    onClick={() =>
                      openModal({
                        title: "Edit Data Penduduk",
                        description: "Ubah informasi detail penduduk",
                        content: <PendudukForm initialData={row} />,
                        className: "max-w-4xl",
                      })
                    }
                  >
                    <Edit size={16} className="text-emerald-600" />
                  </Button>
                )}

                {hasDeletePerm && (
                  <DeleteButton
                    model="penduduk"
                    id={row.id}
                    target={`Penduduk ${row.nama}`}
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
