"use server";

import prisma from "@/lib/prisma";

export async function validateResetToken(token: string) {
  const resetToken = await prisma.passwordResetToken.findFirst({
    where: { token, expires: { gt: new Date() } },
  });

  if (!resetToken) return { error: "Invalid or expired reset link" };

  return { success: true, email: resetToken.email };
}
