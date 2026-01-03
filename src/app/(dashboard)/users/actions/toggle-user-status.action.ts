"use server";

import prisma from "@/lib/prisma";
import { verifyPermission } from "@/lib/rbac";
import { revalidatePath } from "next/cache";

export async function toggleUserStatusAction(userId: string) {
  const hasPerm = await verifyPermission("user:activation");
  if (!hasPerm) return { error: "Forbidden" };

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });

    if (!user) return { error: "User not found" };

    await prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
    });

    revalidatePath("/users");
    return { success: true, isActive: !user.isActive };
  } catch (error: any) {
    return { error: error.message || "Failed to toggle user status" };
  }
}
