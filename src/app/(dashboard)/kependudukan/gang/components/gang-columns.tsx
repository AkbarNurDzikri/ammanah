"use client";

import { useMemo } from "react";
import { DataTableColumn } from "@/components/ui/data-table/types";
import { GangWithRelations } from "../types";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { DeleteButton } from "@/components/ui/delete-button";
import { useGlobalModal } from "@/components/ui/global-modal";
import GangForm from "@/app/(dashboard)/kependudukan/gang/components/gang-form";
import { useAuthStore } from "@/store/useAuthStore";

export const useGangColumns = (): DataTableColumn<GangWithRelations>[] => {
  const { openModal } = useGlobalModal();
  const hasEditPerm = useAuthStore((s) => s.hasPermission("gang:edit"));
  const hasDeletePerm = useAuthStore((s) => s.hasPermission("gang:delete"));

  return useMemo(
    () => [
      {
        key: "nama",
        header: "Nama Gang",
        sortable: true,
      },
      {
        key: "ketuaGang",
        header: "Ketua Gang",
        render: (row) => row.ketuaGang?.nama || "-",
      },
      {
        key: "rumahCount",
        header: "Jumlah Rumah",
        render: (row) => row._count?.rumah || 0,
      },
      {
        key: "keterangan",
        header: "Keterangan",
        render: (row) => row.keterangan || "-",
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
                      title: "Edit Gang",
                      description: "Ubah data gang",
                      content: <GangForm initialData={row} />,
                    })
                  }
                >
                  <Edit size={16} className="text-emerald-600" />
                </Button>
              )}
              {hasDeletePerm && (
                <DeleteButton model="gang" id={row.id} target={row.nama} />
              )}
            </div>
          );
        },
      },
    ],
    [openModal, hasEditPerm, hasDeletePerm]
  );
};
