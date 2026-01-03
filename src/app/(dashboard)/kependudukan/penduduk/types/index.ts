import type { Penduduk, KK, MutasiPenduduk } from "@prisma/client";
import { MutasiJenis } from "@/types/prisma-enums";

export type PendudukWithRelations = Penduduk & {
  kk?: (KK & { rumah: { gang: { nama: string }; nomor: string } }) | null;
  mutasi?: MutasiPenduduk[];
};

export type MutasiFormValues = {
  pendudukId: string;
  jenis: MutasiJenis;
  tanggal: Date;
  alasan: string;
  keterangan?: string | null;
};
