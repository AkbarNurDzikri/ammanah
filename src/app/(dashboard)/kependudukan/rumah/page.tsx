"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { useRumahColumns } from "./components/rumah-columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGlobalModal } from "@/components/ui/global-modal";
import RumahForm from "@/app/(dashboard)/kependudukan/rumah/components/rumah-form";

import { useAuthStore } from "@/store/useAuthStore";

export default function RumahPage() {
  const { openModal } = useGlobalModal();
  const columns = useRumahColumns();
  const hasCreatePerm = useAuthStore((s) => s.hasPermission("rumah:create"));

  return (
    <DataTable
      model="rumah"
      columns={columns}
      pageTitle="Data Rumah"
      pageDescription="Kelola data rumah warga di lingkungan perumahan"
      toolBar={
        hasCreatePerm ? (
          <Button
            onClick={() =>
              openModal({
                title: "Tambah Rumah",
                description: "Masukkan data rumah baru",
                content: <RumahForm />,
              })
            }
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100 dark:shadow-none"
          >
            <Plus size={18} />
            Tambah Rumah
          </Button>
        ) : null
      }
    />
  );
}
