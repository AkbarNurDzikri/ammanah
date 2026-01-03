"use server";

import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth.utils";

export async function resetPasswordAction(token: string, password: string) {
  const resetToken = await prisma.passwordResetToken.findFirst({
    where: { token, expires: { gt: new Date() } },
  });

  if (!resetToken) return { error: "Invalid or expired reset link" };

  const hashedPassword = await hashPassword(password);
  await prisma.user.update({
    where: { email: resetToken.email },
    data: { password: hashedPassword },
  });

  await prisma.passwordResetToken.delete({ where: { id: resetToken.id } });

  return { success: true };
}
