import type { Gang, Penduduk } from "@prisma/client";

export type GangWithRelations = Gang & {
  ketuaGang?: Penduduk | null;
  _count?: {
    rumah: number;
  };
};

export type GangFormValues = {
  nama: string;
  keterangan?: string | null;
  ketuaGangId?: string | null;
};
