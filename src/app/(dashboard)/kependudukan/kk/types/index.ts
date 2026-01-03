import { KK, Rumah, Gang, Penduduk } from "@prisma/client";

export type KKWithRelations = KK & {
  rumah: Rumah & { gang: Gang };
  penduduk?: Penduduk[];
  _count?: {
    penduduk: number;
  };
};
