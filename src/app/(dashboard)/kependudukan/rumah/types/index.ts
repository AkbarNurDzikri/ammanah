import { Rumah, Gang, KK } from "@prisma/client";

export type RumahWithRelations = Rumah & {
  gang: Gang;
  _count?: {
    kk: number;
  };
};

export type RumahFormValues = {
  nomor: string;
  gangId: string;
  status: "KOSONG" | "DIHUNI" | "DIKONTRAKKAN" | "RENOVASI" | "LAINNYA";
  keterangan?: string | null;
};
