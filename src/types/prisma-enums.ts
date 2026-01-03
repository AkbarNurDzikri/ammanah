/**
 * Manual definition of Prisma Enums to avoid importing @prisma/client in client components.
 * Importing directly from @prisma/client in "use client" files can cause build errors
 * (Module not found: .prisma/client/index-browser) in some environments like Vercel.
 */

export const StatusPenduduk = {
  AKTIF: "AKTIF",
  PINDAH: "PINDAH",
  MENINGGAL: "MENINGGAL",
} as const;

export type StatusPenduduk =
  (typeof StatusPenduduk)[keyof typeof StatusPenduduk];

export const JenisKelamin = {
  LAKI_LAKI: "LAKI_LAKI",
  PEREMPUAN: "PEREMPUAN",
} as const;

export type JenisKelamin = (typeof JenisKelamin)[keyof typeof JenisKelamin];
