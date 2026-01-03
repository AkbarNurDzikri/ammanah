import * as z from "zod";

export const kkSchema = z
  .object({
    nomorKK: z.string().length(16, "Nomor KK harus 16 digit"),
    rumahId: z.string().min(1, "Rumah wajib dipilih"),
    isAlamatSesuaiDomisili: z.boolean(),
    alamat: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.isAlamatSesuaiDomisili && !data.alamat) {
        return false;
      }
      return true;
    },
    {
      message: "Alamat wajib diisi jika tidak sesuai domisili",
      path: ["alamat"],
    }
  );

export type KKSchema = z.infer<typeof kkSchema>;
