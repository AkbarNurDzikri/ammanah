"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { useMutasiColumns } from "./components/mutasi-columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useGlobalModal } from "@/components/ui/global-modal";
import MutasiForm from "../penduduk/components/mutasi-form";

import { useAuthStore } from "@/store/useAuthStore";

export default function MutasiPage() {
  const columns = useMutasiColumns();
  const { openModal } = useGlobalModal();
  const hasCreatePerm = useAuthStore((s) => s.hasPermission("mutasi:create"));

  return (
    <DataTable
      model="mutasiPenduduk"
      columns={columns}
      pageTitle="Riwayat Mutasi Kependudukan"
      pageDescription="Daftar seluruh peristiwa mutasi penduduk (Lahir, Meninggal, Pindah)"
      toolBar={
        hasCreatePerm ? (
          <Button
            onClick={() =>
              openModal({
                title: "Tambah Mutasi",
                description: "Catat peristiwa kependudukan baru",
                content: <MutasiForm />,
              })
            }
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 font-bold"
          >
            <Plus className="" size={16} />
            Tambah Mutasi
          </Button>
        ) : null
      }
    />
  );
}
