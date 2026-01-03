"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { usePendudukColumns } from "./components/penduduk-columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGlobalModal } from "@/components/ui/global-modal";
import PendudukForm from "./components/penduduk-form";
import { useAuthStore } from "@/store/useAuthStore";

export default function PendudukPage() {
  const { openModal } = useGlobalModal();
  const columns = usePendudukColumns();
  const hasCreatePerm = useAuthStore((s) => s.hasPermission("penduduk:create"));

  return (
    <DataTable
      model="penduduk"
      columns={columns}
      pageTitle="Data Penduduk"
      pageDescription="Kelola data penduduk sekitar"
      toolBar={
        hasCreatePerm && (
          <Button
            onClick={() =>
              openModal({
                title: "Tambah Penduduk",
                description: "Masukkan data penduduk baru",
                content: <PendudukForm />,
              })
            }
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100 dark:shadow-none"
          >
            <Plus size={18} />
            Tambah Penduduk
          </Button>
        )
      }
    />
  );
}
