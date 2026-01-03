"use server";

import prisma from "@/lib/prisma";
import { decrypt, comparePassword, hashPassword } from "@/lib/auth.utils";
import { cookies } from "next/headers";
import { passwordSchema } from "../schemas/settings-schema";
import { revalidatePath } from "next/cache";

export async function updatePasswordAction(values: any) {
  try {
    const validatedFields = passwordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { oldPassword, newPassword } = validatedFields.data;

    const session = (await cookies()).get("session")?.value;
    if (!session) return { error: "Not authenticated" };

    const payload = await decrypt(session);
    if (!payload?.userId) return { error: "Invalid session" };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
    });

    if (!user) return { error: "User not found" };

    const passwordMatch = await comparePassword(oldPassword, user.password);
    if (!passwordMatch) return { error: "Incorrect old password!" };

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    revalidatePath("/settings");

    return { success: "Password updated successfully!" };
  } catch (error) {
    console.error("Update Password Error:", error);
    return { error: "Something went wrong!" };
  }
}
