"use server";

import { sendVerificationEmail } from "@/lib/email";
import prisma from "@/lib/prisma";

export async function resendVerificationEmailAction(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "User not found" };
  if (user.emailVerified) return { error: "Email already verified" };

  // Delete old tokens
  await prisma.verificationToken.deleteMany({ where: { email } });

  // Generate new token
  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await prisma.verificationToken.create({
    data: { email, token, expires },
  });

  await sendVerificationEmail(email, token);

  return { success: true };
}
