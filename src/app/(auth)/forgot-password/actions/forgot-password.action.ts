"use server";

import prisma from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return {
      error:
        "If an account exists with this email, you will receive a password reset link.",
    };

  // Delete old tokens
  await prisma.passwordResetToken.deleteMany({ where: { email } });

  // Generate new token
  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await prisma.passwordResetToken.create({
    data: { email, token, expires },
  });

  await sendPasswordResetEmail(email, token);

  return { success: true };
}
