"use server";

import prisma from "@/lib/prisma";
import { verifyPermission } from "@/lib/rbac";
import { revalidatePath } from "next/cache";

export async function assignRolesToUserAction(
  userId: string,
  roleIds: string[]
) {
  const hasPerm = await verifyPermission("user:assign");
  if (!hasPerm) return { error: "Forbidden" };

  try {
    await prisma.$transaction(async (tx) => {
      // Clear old roles
      await tx.userRole.deleteMany({
        where: { userId },
      });

      // Add new roles
      if (roleIds.length > 0) {
        await tx.userRole.createMany({
          data: roleIds.map((roleId) => ({
            userId,
            roleId,
          })),
        });
      }
    });

    revalidatePath("/users");
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Failed to assign roles" };
  }
}
