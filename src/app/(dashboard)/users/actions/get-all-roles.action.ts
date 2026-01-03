"use server";

import prisma from "@/lib/prisma";
import { verifyPermission } from "@/lib/rbac";

export async function getAllRolesAction() {
  const hasPerm = await verifyPermission("role:read");
  if (!hasPerm) return { error: "Forbidden" };

  try {
    const roles = await prisma.role.findMany({
      orderBy: { name: "asc" },
    });
    return { success: true, roles };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch roles" };
  }
}
