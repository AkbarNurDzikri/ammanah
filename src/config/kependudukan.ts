import { PenghasilanRange } from "@/types/prisma-enums";

export const INCOME_LABELS: Record<PenghasilanRange, string> = {
  DI_BAWAH_1JT: "< 1jt",
  SATU_SAMPAI_3JT: "1-3jt",
  TIGA_SAMPAI_5JT: "3-5jt",
  LIMA_SAMPAI_10JT: "5-10jt",
  DI_ATAS_10JT: "> 10jt",
};

export const INCOME_ORDER = Object.values(PenghasilanRange);

export const PEKERJAAN_OPTIONS = [
  "TIDAK_BEKERJA",
  "PNS",
  "TNI_POLRI",
  "KARYAWAN_SWASTA",
  "WIRASWASTA",
  "BURUH",
  "PETANI_NELAYAN",
  "PELAJAR_MAHASISWA",
  "IBU_RUMAH_TANGGA",
  "PENSIUNAN",
].map((v) => ({
  label: v.replace(/_/g, " "),
  value: v,
}));
