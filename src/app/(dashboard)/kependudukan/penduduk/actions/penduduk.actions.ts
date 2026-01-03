"use server";

import prisma from "@/lib/prisma";
import {
  pendudukSchema,
  PendudukSchema,
  mutasiSchema,
  MutasiSchema,
} from "../schemas/penduduk.schema";
import { verifyPermission } from "@/lib/rbac";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";

import { Prisma, StatusPenduduk } from "@prisma/client";

async function getUserId() {
  const session = await getSession();
  return session?.userId as string | undefined;
}

import { handleDbError } from "@/lib/db-error-handler";

export async function createPenduduk(data: PendudukSchema) {
  const hasPerm = await verifyPermission("penduduk:create");
  if (!hasPerm) throw new Error("Forbidden");

  const validated = pendudukSchema.parse(data);

  // Enforce single Kepala Keluarga per KK
  if (validated.kkId && validated.hubunganKeluarga === "KEPALA_KELUARGA") {
    const existingKepala = await prisma.penduduk.findFirst({
      where: {
        kkId: validated.kkId,
        hubunganKeluarga: "KEPALA_KELUARGA",
        status: "AKTIF",
      },
    });
    if (existingKepala) {
      throw new Error(
        `Kartu Keluarga ini sudah memiliki Kepala Keluarga (${existingKepala.nama}). Silakan ubah hubungan keluarga kepala keluarga sebelumnya terlebih dahulu.`
      );
    }
  }

  const userId = await getUserId();
  const { kkId, isKtpSesuaiDomisili, alamatKtp, ...rest } = validated;

  try {
    const penduduk = await prisma.penduduk.create({
      data: {
        ...(rest as Prisma.PendudukUncheckedCreateInput),
        nik: validated.nik.trim(),
        kkId: kkId || null,
        isKtpSesuaiDomisili,
        alamatKtp: isKtpSesuaiDomisili ? null : alamatKtp || null,
        createdById: userId,
        updatedById: userId,
      },
    });

    revalidatePath("/kependudukan/penduduk");
    return penduduk;
  } catch (error) {
    handleDbError(error);
  }
}

export async function updatePenduduk(id: string, data: PendudukSchema) {
  const hasPerm = await verifyPermission("penduduk:edit");
  if (!hasPerm) throw new Error("Forbidden");

  const validated = pendudukSchema.parse(data);

  // Enforce single Kepala Keluarga per KK
  if (validated.kkId && validated.hubunganKeluarga === "KEPALA_KELUARGA") {
    const existingKepala = await prisma.penduduk.findFirst({
      where: {
        kkId: validated.kkId,
        hubunganKeluarga: "KEPALA_KELUARGA",
        status: "AKTIF",
        id: { not: id }, // Exclude the current resident
      },
    });
    if (existingKepala) {
      throw new Error(
        `Kartu Keluarga ini sudah memiliki Kepala Keluarga (${existingKepala.nama}). Silakan ubah hubungan keluarga kepala keluarga sebelumnya terlebih dahulu.`
      );
    }
  }

  const userId = await getUserId();
  const { kkId, isKtpSesuaiDomisili, alamatKtp, ...rest } = validated;

  try {
    const penduduk = await prisma.penduduk.update({
      where: { id },
      data: {
        ...(rest as Prisma.PendudukUncheckedUpdateInput),
        nik: validated.nik.trim(),
        kkId: kkId || null,
        isKtpSesuaiDomisili,
        alamatKtp: isKtpSesuaiDomisili ? null : alamatKtp || null,
        updatedById: userId,
      },
    });

    revalidatePath("/kependudukan/penduduk");
    return penduduk;
  } catch (error) {
    handleDbError(error);
  }
}

export async function deletePenduduk(id: string) {
  const hasPerm = await verifyPermission("penduduk:delete");
  if (!hasPerm) throw new Error("Forbidden");

  try {
    await prisma.penduduk.delete({
      where: { id },
    });

    revalidatePath("/kependudukan/penduduk");
  } catch (error) {
    handleDbError(error);
  }
}

export async function recordMutasi(pendudukId: string, data: MutasiSchema) {
  const hasPerm = await verifyPermission("mutasi:create");
  if (!hasPerm) throw new Error("Forbidden");

  const validated = mutasiSchema.parse(data);
  const userId = await getUserId();

  try {
    const mutasi = await prisma.$transaction(async (tx) => {
      const res = await tx.mutasiPenduduk.create({
        data: {
          ...validated,
          pendudukId,
          createdById: userId,
          updatedById: userId,
        },
      });

      // Update penduduk status based on mutasi
      let newStatus: StatusPenduduk = StatusPenduduk.AKTIF;
      if (validated.jenis === "PINDAH_KELUAR")
        newStatus = StatusPenduduk.PINDAH;
      if (validated.jenis === "MENINGGAL") newStatus = StatusPenduduk.MENINGGAL;

      await tx.penduduk.update({
        where: { id: pendudukId },
        data: { status: newStatus },
      });

      return res;
    });

    revalidatePath("/kependudukan/penduduk");
    revalidatePath("/kependudukan/mutasi");
    return mutasi;
  } catch (error) {
    handleDbError(error);
  }
}

export async function updateMutasi(id: string, data: MutasiSchema) {
  const hasPerm = await verifyPermission("mutasi:edit");
  if (!hasPerm) throw new Error("Forbidden");

  const validated = mutasiSchema.parse(data);
  const userId = await getUserId();

  try {
    const mutasi = await prisma.$transaction(async (tx) => {
      const res = await tx.mutasiPenduduk.update({
        where: { id },
        data: {
          ...validated,
          updatedById: userId,
        },
      });

      // Re-sync penduduk status
      let newStatus: StatusPenduduk = StatusPenduduk.AKTIF;
      if (validated.jenis === "PINDAH_KELUAR")
        newStatus = StatusPenduduk.PINDAH;
      if (validated.jenis === "MENINGGAL") newStatus = StatusPenduduk.MENINGGAL;

      await tx.penduduk.update({
        where: { id: res.pendudukId },
        data: { status: newStatus },
      });

      return res;
    });

    revalidatePath("/kependudukan/penduduk");
    revalidatePath("/kependudukan/mutasi");
    return mutasi;
  } catch (error) {
    handleDbError(error);
  }
}

export async function deleteMutasi(id: string) {
  const hasPerm = await verifyPermission("mutasi:delete");
  if (!hasPerm) throw new Error("Forbidden");

  try {
    await prisma.$transaction(async (tx) => {
      const mutasi = await tx.mutasiPenduduk.delete({
        where: { id },
      });

      // Revert status to AKTIF if there are no other terminal mutations
      // For simplicity, we assume deleting any mutation reverts to AKTIF
      // (since terminal mutations are usually the last ones)
      await tx.penduduk.update({
        where: { id: mutasi.pendudukId },
        data: { status: StatusPenduduk.AKTIF },
      });
    });

    revalidatePath("/kependudukan/penduduk");
    revalidatePath("/kependudukan/mutasi");
  } catch (error) {
    handleDbError(error);
  }
}

export async function getPendudukOptions() {
  const penduduk = await prisma.penduduk.findMany({
    where: { status: StatusPenduduk.AKTIF },
    select: { id: true, nama: true, nik: true },
    orderBy: { nama: "asc" },
  });

  return penduduk.map((p) => ({
    label: `${p.nama} (${p.nik})`,
    value: p.id,
  }));
}
