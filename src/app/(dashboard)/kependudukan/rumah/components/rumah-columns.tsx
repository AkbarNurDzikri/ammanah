"use client";

import { useMemo } from "react";
import { DataTableColumn } from "@/components/ui/data-table/types";
import { RumahWithRelations } from "../types";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { DeleteButton } from "@/components/ui/delete-button";
import { useGlobalModal } from "@/components/ui/global-modal";
import RumahForm from "@/app/(dashboard)/kependudukan/rumah/components/rumah-form";
import { StatusRumah } from "@/types/prisma-enums";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const statusColors: Record<StatusRumah, string> = {
  [StatusRumah.DIHUNI]:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  [StatusRumah.KOSONG]:
    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
  [StatusRumah.DIKONTRAKKAN]:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  [StatusRumah.RENOVASI]:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  [StatusRumah.LAINNYA]:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export const useRumahColumns = (): DataTableColumn<RumahWithRelations>[] => {
  const { openModal } = useGlobalModal();
  const hasEditPerm = useAuthStore((s) => s.hasPermission("rumah:edit"));
  const hasDeletePerm = useAuthStore((s) => s.hasPermission("rumah:delete"));

  return useMemo(
    () => [
      {
        key: "nomor",
        header: "Nomor Rumah",
        sortable: true,
      },
      {
        key: "gangId",
        header: "Gang",
        render: (row) => row.gang.nama,
      },
      {
        key: "status",
        header: "Status",
        render: (row) => (
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-bold uppercase",
              statusColors[row.status]
            )}
          >
            {row.status}
          </span>
        ),
      },
      {
        key: "kkCount",
        header: "Jumlah KK",
        render: (row) => row._count?.kk || 0,
      },
      {
        key: "actions",
        header: "Aksi",
        render: (row) => {
          return (
            <div className="flex items-center gap-2">
              {hasEditPerm && (
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl"
                  onClick={() =>
                    openModal({
                      title: "Edit Rumah",
                      description: "Ubah data rumah",
                      content: <RumahForm initialData={row} />,
                    })
                  }
                >
                  <Edit size={16} className="text-emerald-600" />
                </Button>
              )}
              {hasDeletePerm && (
                <DeleteButton
                  model="rumah"
                  id={row.id}
                  target={`Rumah ${row.nomor}`}
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
