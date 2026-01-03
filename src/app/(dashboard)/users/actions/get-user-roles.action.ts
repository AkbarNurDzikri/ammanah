"use server";

import prisma from "@/lib/prisma";
import { verifyPermission } from "@/lib/rbac";

export async function getUserRolesAction(userId: string) {
  const hasPerm = await verifyPermission("user:read");
  if (!hasPerm) return { error: "Forbidden" };

  try {
    const userRoles = await prisma.userRole.findMany({
      where: { userId },
      include: { role: true },
    });
    return { success: true, userRoles };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch user roles" };
  }
}
