import * as z from "zod";
import {
  JenisKelamin,
  GolonganDarah,
  Agama,
  HubunganKeluarga,
  StatusKawin,
  PenghasilanRange,
  StatusPenduduk,
  MutasiJenis,
  Pendidikan,
  Pekerjaan,
} from "@/types/prisma-enums";

// Workaround for Zod nativeEnum deprecation and preserving literal types
const getEnumValues = <T extends Record<string, string>>(e: T) =>
  Object.values(e) as [T[keyof T], ...T[keyof T][]];

export const pendudukSchema = z
  .object({
    nik: z.string().length(16, "NIK harus 16 digit"),
    nama: z.string().min(1, "Nama wajib diisi"),
    tempatLahir: z.string().min(1, "Tempat lahir wajib diisi"),
    tanggalLahir: z.date({
      message: "Tanggal lahir wajib diisi",
    }),
    jenisKelamin: z.enum(getEnumValues(JenisKelamin), {
      message: "Jenis kelamin wajib dipilih",
    }),
    golonganDarah: z.enum(getEnumValues(GolonganDarah)).optional().nullable(),
    agama: z.enum(getEnumValues(Agama), {
      message: "Agama wajib dipilih",
    }),
    pendidikan: z.enum(getEnumValues(Pendidikan)).optional().nullable(),
    pekerjaan: z.string().optional().nullable(),
    statusKawin: z.enum(getEnumValues(StatusKawin)).optional().nullable(),
    hubunganKeluarga: z.enum(getEnumValues(HubunganKeluarga), {
      message: "Hubungan keluarga wajib dipilih",
    }),
    penghasilan: z.number().optional().nullable(),
    penghasilanRange: z
      .enum(getEnumValues(PenghasilanRange))
      .optional()
      .nullable(),
    ayahKandung: z.string().optional().nullable(),
    ibuKandung: z.string().optional().nullable(),
    isKtpSesuaiDomisili: z.boolean({
      message: "Status KTP wajib ditentukan",
    }),
    alamatKtp: z.string().optional().nullable(),
    kkId: z.string().optional().nullable(),
    status: z.enum(getEnumValues(StatusPenduduk), {
      message: "Status penduduk wajib dipilih",
    }),
  })
  .refine(
    (data) => {
      if (!data.isKtpSesuaiDomisili) {
        if (!data.alamatKtp || data.alamatKtp.trim() === "") {
          return false;
        }
      }
      return true;
    },
    {
      message: "Alamat KTP wajib diisi jika tidak sesuai domisili",
      path: ["alamatKtp"],
    }
  );

export type PendudukSchema = z.infer<typeof pendudukSchema>;

export const mutasiSchema = z
  .object({
    pendudukId: z.string().min(1, "Penduduk wajib dipilih").optional(),
    jenis: z.enum(getEnumValues(MutasiJenis), {
      message: "Jenis mutasi wajib dipilih",
    }),
    tanggal: z.date({ message: "Tanggal peristiwa wajib diisi" }),
    alasan: z.string().optional().nullable(),
    keterangan: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.jenis !== "PINDAH_DATANG") {
      if (!data.alasan || data.alasan.trim() === "") {
        ctx.addIssue({
          code: "custom",
          path: ["alasan"],
          message: "Alasan wajib diisi untuk jenis mutasi ini",
        });
      }
    }
  });

export type MutasiSchema = z.infer<typeof mutasiSchema>;
