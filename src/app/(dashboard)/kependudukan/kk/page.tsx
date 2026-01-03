"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { useKKColumns } from "./components/kk-columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGlobalModal } from "@/components/ui/global-modal";
import KKForm from "./components/kk-form";

import { useAuthStore } from "@/store/useAuthStore";

export default function KKPage() {
  const { openModal } = useGlobalModal();
  const columns = useKKColumns();
  const hasCreatePerm = useAuthStore((s) => s.hasPermission("kk:create"));

  return (
    <DataTable
      model="kK"
      columns={columns}
      pageTitle="Daftar Kartu Keluarga"
      pageDescription="Kelola data nomor Kartu Keluarga dan domisili rumah"
      toolBar={
        hasCreatePerm ? (
          <Button
            onClick={() =>
              openModal({
                title: "Tambah Kartu Keluarga",
                description: "Masukkan nomor KK baru dan pilih rumah",
                content: <KKForm />,
                className: "max-w-2xl",
              })
            }
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-100 dark:shadow-none"
          >
            <Plus size={18} />
            Tambah KK
          </Button>
        ) : null
      }
    />
  );
}
