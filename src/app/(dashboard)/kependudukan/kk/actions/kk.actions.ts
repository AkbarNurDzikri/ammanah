"use server";

import prisma from "@/lib/prisma";
import { kkSchema, KKSchema } from "../schemas/kk.schema";
import { verifyPermission } from "@/lib/rbac";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";

async function getUserId() {
  const session = await getSession();
  return session?.userId as string | undefined;
}

import { handleDbError } from "@/lib/db-error-handler";

export async function createKK(data: KKSchema) {
  const hasPerm = await verifyPermission("kk:create");
  if (!hasPerm) throw new Error("Forbidden");

  const validated = kkSchema.parse(data);
  const userId = await getUserId();

  const { rumahId, nomorKK, isAlamatSesuaiDomisili, ...rest } = validated;

  try {
    const kk = await prisma.kK.create({
      data: {
        ...rest,
        nomorKK: nomorKK.trim(),
        alamat: isAlamatSesuaiDomisili ? null : rest.alamat || null,
        rumah: {
          connect: { id: rumahId },
        },
        ...(userId
          ? {
              createdBy: { connect: { id: userId } },
              updatedBy: { connect: { id: userId } },
            }
          : {}),
      },
    });

    revalidatePath("/kependudukan/kk");
    return kk;
  } catch (error) {
    handleDbError(error);
  }
}

export async function updateKK(id: string, data: KKSchema) {
  const hasPerm = await verifyPermission("kk:edit");
  if (!hasPerm) throw new Error("Forbidden");

  const validated = kkSchema.parse(data);
  const userId = await getUserId();

  const { rumahId, nomorKK, isAlamatSesuaiDomisili, ...rest } = validated;

  try {
    const kk = await prisma.kK.update({
      where: { id },
      data: {
        ...rest,
        nomorKK: nomorKK.trim(),
        alamat: isAlamatSesuaiDomisili ? null : rest.alamat || null,
        rumah: {
          connect: { id: rumahId },
        },
        ...(userId
          ? {
              updatedBy: { connect: { id: userId } },
            }
          : {}),
      },
    });

    revalidatePath("/kependudukan/kk");
    return kk;
  } catch (error) {
    handleDbError(error);
  }
}

export async function deleteKK(id: string) {
  const hasPerm = await verifyPermission("kk:delete");
  if (!hasPerm) throw new Error("Forbidden");

  try {
    await prisma.kK.delete({
      where: { id },
    });

    revalidatePath("/kependudukan/kk");
  } catch (error) {
    handleDbError(error);
  }
}

export async function getKKs() {
  return await prisma.kK.findMany({
    include: {
      rumah: { include: { gang: true } },
    },
    orderBy: { nomorKK: "asc" },
  });
}
