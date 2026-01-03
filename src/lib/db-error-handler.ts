import { Prisma } from "@prisma/client";

export class AppError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "AppError";
  }
}

const FIELD_MAP: Record<string, string> = {
  nama: "Nama",
  nomor: "Nomor Rumah",
  nomorkk: "Nomor KK",
  nik: "NIK",
  email: "Email",
  username: "Username",
  name: "Nama", // for Role/Permission
  token: "Token",
};

export function handleDbError(error: unknown): never {
  console.error("Database Error:", error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === "P2002") {
      const target = error.meta?.target;
      let field = "Data";

      if (Array.isArray(target) && target.length > 0) {
        field = target[0];
      } else if (typeof target === "string") {
        field = target;
      } else {
        // Fallback: Try to parse generic message or check model
        // Example message: "Unique constraint failed on the fields: (`nomor`)"
        const match = error.message.match(/fields:\s*\(`?(\w+)`?\)/);
        if (match && match[1]) {
          field = match[1];
        }
      }

      const fieldName = FIELD_MAP[field.toLowerCase()] || field;

      throw new Error(`${fieldName} sudah terdaftar atau digunakan.`);
    }

    // Record not found
    if (error.code === "P2025") {
      throw new Error("Data tidak ditemukan atau sudah dihapus.");
    }

    // Foreign key constraint violation
    if (error.code === "P2003") {
      const fieldName = error.meta?.field_name as string;
      throw new Error(
        `Gagal memproses data karena keterkaitan dengan data lain (${fieldName}).`
      );
    }
  }

  if (error instanceof Error) {
    throw new Error(error.message);
  }

  throw new Error("Terjadi kesalahan yang tidak diketahui pada server.");
}
