"use server";
import { getSession } from "./session";
import prisma from "./prisma";
import { PermissionName, SUPER_ADMIN_ROLE } from "@/config/permissions";

export async function getUserWithPermissions(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) return null;

  const permissions = new Set<string>();
  const roles: string[] = [];
  let isSuperAdmin = false;

  user.roles.forEach((ur) => {
    roles.push(ur.role.name);
    if (ur.role.name === SUPER_ADMIN_ROLE) isSuperAdmin = true;
    ur.role.permissions.forEach((rp) => {
      permissions.add(rp.permission.name);
    });
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    isSuperAdmin,
    permissions: Array.from(permissions),
    roles,
  };
}

export async function verifyPermission(permissionName: PermissionName) {
  console.log(`[RBAC] Checking permission: ${permissionName}`);
  const session = await getSession();
  if (!session) {
    console.log("[RBAC] Session not found");
    return false;
  }
  console.log(`[RBAC] Session found for user: ${session.userId}`);

  const userPermissions = await getUserWithPermissions(session.userId);
  if (!userPermissions) {
    console.log("[RBAC] User data not found in DB");
    return false;
  }

  if (userPermissions.isSuperAdmin) {
    console.log("[RBAC] User is Super Admin - Access Granted");
    return true;
  }

  const hasPerm = userPermissions.permissions.includes(permissionName);
  console.log(`[RBAC] Permission ${permissionName}: ${hasPerm}`);
  return hasPerm;
}
