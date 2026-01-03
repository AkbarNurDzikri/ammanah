import { PERMISSIONS } from "@/config/permissions";
import prisma from "@/lib/prisma";

export async function seedPermissionsAction() {
  for (const perm of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: { description: perm.description },
      create: { name: perm.name, description: perm.description },
    });
  }
}
