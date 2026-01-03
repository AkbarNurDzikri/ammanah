"use client";

import { PendudukWithRelations } from "../types";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PendudukDetailsProps {
  data: PendudukWithRelations;
}

export default function PendudukDetails({ data }: PendudukDetailsProps) {
  const formatDate = (date: Date | null | undefined) =>
    date ? format(new Date(date), "dd MMMM yyyy", { locale: id }) : "-";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
            NIK
          </p>
          <p className="font-semibold">{data.nik}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
            Nama Lengkap
          </p>
          <p className="font-semibold">{data.nama}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
            Tempat, Tanggal Lahir
          </p>
          <p>
            {data.tempatLahir || "-"}, {formatDate(data.tanggalLahir)}
          </p>
        </div>
        <div>
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
            Jenis Kelamin
          </p>
          <p>{data.jenisKelamin === "LAKI_LAKI" ? "Laki-laki" : "Perempuan"}</p>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
            Agama
          </p>
          <p>{data.agama}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
            Golongan Darah
          </p>
          <p>
            {data.golonganDarah
              ?.replace("_POSITIF", "+")
              .replace("_NEGATIF", "-") || "-"}
          </p>
        </div>
        <div>
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
            Pendidikan
          </p>
          <p>{data.pendidikan?.replace(/_/g, " ") || "-"}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
            Pekerjaan
          </p>
          <p>{data.pekerjaan?.replace(/_/g, " ") || "-"}</p>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
            Status Kawin
          </p>
          <p>{data.statusKawin?.replace(/_/g, " ") || "-"}</p>
        </div>
        <div>
          <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
            Hubungan Keluarga
          </p>
          <p>{data.hubunganKeluarga.replace(/_/g, " ")}</p>
        </div>
      </div>

      <Separator />

      <div>
        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2">
          Informasi KK & Domisili
        </p>
        {data.kk ? (
          <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-xl border border-dashed text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-500 font-medium italic">Nomor KK</span>
              <span className="font-bold">{data.kk.nomorKK}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 font-medium italic">Rumah</span>
              <span className="font-bold">
                No. {data.kk.rumah.nomor} ({data.kk.rumah.gang.nama})
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-zinc-400 italic">
            Belum terdaftar dalam KK
          </p>
        )}
      </div>

      {data.mutasi && data.mutasi.length > 0 && (
        <>
          <Separator />
          <div>
            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-2">
              Riwayat Mutasi
            </p>
            <div className="space-y-2">
              {data.mutasi.map((m) => (
                <div key={m.id} className="flex items-start gap-3 text-xs">
                  <Badge
                    variant="outline"
                    className="text-[10px] uppercase shrink-0"
                  >
                    {m.jenis.replace(/_/g, " ")}
                  </Badge>
                  <div>
                    <p className="font-medium">{formatDate(m.tanggal)}</p>
                    <p className="text-zinc-500">{m.alasan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
