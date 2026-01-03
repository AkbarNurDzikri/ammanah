import { Penduduk, KK, MutasiPenduduk, MutasiJenis } from "@prisma/client";

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
