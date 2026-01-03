import * as z from "zod";

export const gangSchema = z.object({
  nama: z.string().min(1, "Nama gang wajib diisi"),
  keterangan: z.string().optional().nullable(),
  ketuaGangId: z.string().optional().nullable(),
});

export type GangSchema = z.infer<typeof gangSchema>;
