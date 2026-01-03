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

export const PenghasilanRange = {
  DI_BAWAH_1JT: "DI_BAWAH_1JT",
  SATU_SAMPAI_3JT: "SATU_SAMPAI_3JT",
  TIGA_SAMPAI_5JT: "TIGA_SAMPAI_5JT",
  LIMA_SAMPAI_10JT: "LIMA_SAMPAI_10JT",
  DI_ATAS_10JT: "DI_ATAS_10JT",
} as const;

export type PenghasilanRange =
  (typeof PenghasilanRange)[keyof typeof PenghasilanRange];

export const StatusRumah = {
  KOSONG: "KOSONG",
  DIHUNI: "DIHUNI",
  DIKONTRAKKAN: "DIKONTRAKKAN",
  RENOVASI: "RENOVASI",
  LAINNYA: "LAINNYA",
} as const;

export type StatusRumah = (typeof StatusRumah)[keyof typeof StatusRumah];

export const GolonganDarah = {
  A_POSITIF: "A_POSITIF",
  A_NEGATIF: "A_NEGATIF",
  B_POSITIF: "B_POSITIF",
  B_NEGATIF: "B_NEGATIF",
  AB_POSITIF: "AB_POSITIF",
  AB_NEGATIF: "AB_NEGATIF",
  O_POSITIF: "O_POSITIF",
  O_NEGATIF: "O_NEGATIF",
  TIDAK_TAHU: "TIDAK_TAHU",
} as const;

export type GolonganDarah = (typeof GolonganDarah)[keyof typeof GolonganDarah];

export const Agama = {
  ISLAM: "ISLAM",
  KRISTEN: "KRISTEN",
  KATOLIK: "KATOLIK",
  HINDU: "HINDU",
  BUDHA: "BUDHA",
  KONGHUCU: "KONGHUCU",
} as const;

export type Agama = (typeof Agama)[keyof typeof Agama];

export const HubunganKeluarga = {
  KEPALA_KELUARGA: "KEPALA_KELUARGA",
  ISTRI: "ISTRI",
  ANAK: "ANAK",
  MENANTU: "MENANTU",
  CUCU: "CUCU",
  ORANG_TUA: "ORANG_TUA",
  MERTUA: "MERTUA",
  FAMILI_LAIN: "FAMILI_LAIN",
  PEMBANTU: "PEMBANTU",
  LAINNYA: "LAINNYA",
} as const;

export type HubunganKeluarga =
  (typeof HubunganKeluarga)[keyof typeof HubunganKeluarga];

export const StatusKawin = {
  BELUM_KAWIN: "BELUM_KAWIN",
  KAWIN: "KAWIN",
  CERAI_HIDUP: "CERAI_HIDUP",
  CERAI_MATI: "CERAI_MATI",
} as const;

export type StatusKawin = (typeof StatusKawin)[keyof typeof StatusKawin];

export const MutasiJenis = {
  PINDAH_DATANG: "PINDAH_DATANG",
  PINDAH_KELUAR: "PINDAH_KELUAR",
  PINDAH_INTERNAL: "PINDAH_INTERNAL",
  MENINGGAL: "MENINGGAL",
  LAHIR: "LAHIR",
} as const;

export type MutasiJenis = (typeof MutasiJenis)[keyof typeof MutasiJenis];

export const Pendidikan = {
  TIDAK_SEKOLAH: "TIDAK_SEKOLAH",
  SD: "SD",
  SMP: "SMP",
  SMA: "SMA",
  D1: "D1",
  D2: "D2",
  D3: "D3",
  D4_S1: "D4_S1",
  S2: "S2",
  S3: "S3",
} as const;

export type Pendidikan = (typeof Pendidikan)[keyof typeof Pendidikan];

export const Pekerjaan = {
  TIDAK_BEKERJA: "TIDAK_BEKERJA",
  PNS: "PNS",
  TNI_POLRI: "TNI_POLRI",
  KARYAWAN_SWASTA: "KARYAWAN_SWASTA",
  WIRASWASTA: "WIRASWASTA",
  BURUH: "BURUH",
  PETANI_NELAYAN: "PETANI_NELAYAN",
  PELAJAR_MAHASISWA: "PELAJAR_MAHASISWA",
  IBU_RUMAH_TANGGA: "IBU_RUMAH_TANGGA",
  PENSIUNAN: "PENSIUNAN",
  LAINNYA: "LAINNYA",
} as const;

export type Pekerjaan = (typeof Pekerjaan)[keyof typeof Pekerjaan];
