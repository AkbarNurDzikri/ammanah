"use server";

import prisma from "@/lib/prisma";
import { verifyPermission } from "@/lib/rbac";
import { revalidatePath } from "next/cache";

export async function createOrUpdateRoleAction(
  formData: FormData,
  roleId?: string
) {
  // 1. Security Check
  const hasPerm = await verifyPermission("role:manage");
  if (!hasPerm && !roleId) {
    const hasCreatePerm = await verifyPermission("role:create");
    if (!hasCreatePerm) return { error: "Forbidden" };
  } else if (!hasPerm && roleId) {
    return { error: "Forbidden" };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  // Extract permissions from formData
  // Permissions are sent as "perm_name: true/false"
  const permissionEntries = Array.from(formData.entries()).filter(
    ([key]) => !["name", "description"].includes(key)
  );

  try {
    const role = await prisma.$transaction(async (tx) => {
      // 1. Create or Update Role
      const r = await tx.role.upsert({
        where: { id: roleId || "new" },
        update: { name, description },
        create: { name, description },
      });

      // 2. Manage Permissions
      // If updating, clear old permissions first
      if (roleId) {
        await tx.rolePermission.deleteMany({
          where: { roleId: r.id },
        });
      }

      // 3. Add new permissions
      const activePermissions = permissionEntries
        .filter(([_, value]) => value === "true")
        .map(([key]) => key);

      if (activePermissions.length > 0) {
        // Find permission IDs
        const perms = await tx.permission.findMany({
          where: { name: { in: activePermissions } },
        });

        await tx.rolePermission.createMany({
          data: perms.map((p) => ({
            roleId: r.id,
            permissionId: p.id,
          })),
        });
      }

      return r;
    });

    revalidatePath("/roles");
    return { success: true, role };
  } catch (error: any) {
    console.error("Role Action Error:", error);
    return { error: error.message || "Failed to save role" };
  }
}
