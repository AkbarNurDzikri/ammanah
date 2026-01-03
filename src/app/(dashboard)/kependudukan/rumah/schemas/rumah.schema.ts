import * as z from "zod";
import { StatusRumah } from "@/types/prisma-enums";

export const rumahSchema = z.object({
  nomor: z.string().min(1, "Nomor rumah wajib diisi"),
  gangId: z.string().min(1, "Gang wajib dipilih"),
  status: z.nativeEnum(StatusRumah),
  keterangan: z.string().optional().nullable(),
});

export type RumahSchema = z.infer<typeof rumahSchema>;
