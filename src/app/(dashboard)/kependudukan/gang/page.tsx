"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { useGangColumns } from "./components/gang-columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGlobalModal } from "@/components/ui/global-modal";
import GangForm from "@/app/(dashboard)/kependudukan/gang/components/gang-form";

import { useAuthStore } from "@/store/useAuthStore";

export default function GangPage() {
  const { openModal } = useGlobalModal();
  const columns = useGangColumns();
  const hasCreatePerm = useAuthStore((s) => s.hasPermission("gang:create"));

  return (
    <DataTable
      model="gang"
      columns={columns}
      pageTitle="Data Gang (Lingkungan)"
      pageDescription="Kelola data gang atau lingkungan perumahan"
      toolBar={
        hasCreatePerm ? (
          <Button
            onClick={() =>
              openModal({
                title: "Tambah Gang",
                description: "Masukkan data gang baru",
                content: <GangForm />,
              })
            }
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100 dark:shadow-none"
          >
            <Plus size={18} />
            Tambah Gang
          </Button>
        ) : null
      }
    />
  );
}
