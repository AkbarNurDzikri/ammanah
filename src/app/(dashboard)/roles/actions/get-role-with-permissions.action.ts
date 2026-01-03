"use server";

import prisma from "@/lib/prisma";
import { verifyPermission } from "@/lib/rbac";

export async function getRoleWithPermissionsAction(id: string) {
  const hasPerm = await verifyPermission("role:read");
  if (!hasPerm) return { error: "Forbidden" };

  try {
    const role = await prisma.role.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });
    return { success: true, role };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch role" };
  }
}
