"use server";

import prisma from "@/lib/prisma";
import { rumahSchema, RumahSchema } from "../schemas/rumah.schema";
import { verifyPermission } from "@/lib/rbac";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";

async function getUserId() {
  const session = await getSession();
  return session?.userId as string | undefined;
}

import { handleDbError } from "@/lib/db-error-handler";

export async function createRumah(data: RumahSchema) {
  const hasPerm = await verifyPermission("rumah:create");
  if (!hasPerm) throw new Error("Forbidden");

  const validated = rumahSchema.parse(data);
  const userId = await getUserId();

  try {
    const rumah = await prisma.rumah.create({
      data: {
        ...validated,
        nomor: validated.nomor.toUpperCase(),
        createdById: userId,
        updatedById: userId,
      },
    });

    revalidatePath("/kependudukan/rumah");
    return rumah;
  } catch (error) {
    handleDbError(error);
  }
}

export async function updateRumah(id: string, data: RumahSchema) {
  const hasPerm = await verifyPermission("rumah:edit");
  if (!hasPerm) throw new Error("Forbidden");

  const validated = rumahSchema.parse(data);
  const userId = await getUserId();

  try {
    const rumah = await prisma.rumah.update({
      where: { id },
      data: {
        ...validated,
        nomor: validated.nomor.toUpperCase(),
        updatedById: userId,
      },
    });

    revalidatePath("/kependudukan/rumah");
    return rumah;
  } catch (error) {
    handleDbError(error);
  }
}

export async function deleteRumah(id: string) {
  const hasPerm = await verifyPermission("rumah:delete");
  if (!hasPerm) throw new Error("Forbidden");

  try {
    await prisma.rumah.delete({
      where: { id },
    });

    revalidatePath("/kependudukan/rumah");
  } catch (error) {
    handleDbError(error);
  }
}

export async function getRumahs() {
  return await prisma.rumah.findMany({
    include: { gang: true },
    orderBy: { nomor: "asc" },
  });
}
