"use server";

import prisma from "@/lib/prisma";
import { gangSchema, GangSchema } from "../schemas/gang.schema";
import { verifyPermission } from "@/lib/rbac";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";

async function getUserId() {
  const session = await getSession();
  return session?.userId as string | undefined;
}

import { handleDbError } from "@/lib/db-error-handler";

export async function createGang(data: GangSchema) {
  const hasPerm = await verifyPermission("gang:create");
  if (!hasPerm) throw new Error("Forbidden");

  const validated = gangSchema.parse(data);
  const userId = await getUserId();

  try {
    const gang = await prisma.gang.create({
      data: {
        ...validated,
        nama: validated.nama.toUpperCase(),
        createdById: userId,
        updatedById: userId,
      },
    });

    revalidatePath("/kependudukan/gang");
    return gang;
  } catch (error) {
    handleDbError(error);
  }
}

export async function updateGang(id: string, data: GangSchema) {
  const hasPerm = await verifyPermission("gang:edit");
  if (!hasPerm) throw new Error("Forbidden");

  const validated = gangSchema.parse(data);
  const userId = await getUserId();

  try {
    const gang = await prisma.gang.update({
      where: { id },
      data: {
        ...validated,
        nama: validated.nama.toUpperCase(),
        updatedById: userId,
      },
    });

    revalidatePath("/kependudukan/gang");
    return gang;
  } catch (error) {
    handleDbError(error);
  }
}

export async function deleteGang(id: string) {
  const hasPerm = await verifyPermission("gang:delete");
  if (!hasPerm) throw new Error("Forbidden");

  try {
    await prisma.gang.delete({
      where: { id },
    });

    revalidatePath("/kependudukan/gang");
  } catch (error) {
    handleDbError(error);
  }
}

export async function assignKetuaGang(
  gangId: string,
  pendudukId: string | null
) {
  const hasPerm = await verifyPermission("gang:edit");
  if (!hasPerm) throw new Error("Forbidden");

  const userId = await getUserId();

  try {
    const gang = await prisma.gang.update({
      where: { id: gangId },
      data: {
        ketuaGangId: pendudukId,
        updatedById: userId,
      },
    });

    revalidatePath("/kependudukan/gang");
    return gang;
  } catch (error) {
    handleDbError(error);
  }
}

export async function getGangs() {
  return await prisma.gang.findMany({
    orderBy: { nama: "asc" },
  });
}
