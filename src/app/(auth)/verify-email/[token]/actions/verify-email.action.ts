"use server";

import prisma from "@/lib/prisma";

export async function verifyEmailAction(token: string) {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: { token, expires: { gt: new Date() } },
  });

  if (!verificationToken)
    return { error: "Invalid or expired verification link" };

  await prisma.user.update({
    where: { email: verificationToken.email },
    data: {
      emailVerified: new Date(),
      isActive: true, // Activate account when email is verified
    },
  });

  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  });

  return { success: true };
}
