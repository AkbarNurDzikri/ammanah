"use server";

import prisma from "@/lib/prisma";
import { decrypt } from "@/lib/auth.utils";
import { cookies } from "next/headers";
import { profileSchema } from "../schemas/settings-schema";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(values: { name: string }) {
  try {
    const validatedFields = profileSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const session = (await cookies()).get("session")?.value;
    if (!session) return { error: "Not authenticated" };

    const payload = await decrypt(session);
    if (!payload?.userId) return { error: "Invalid session" };

    await prisma.user.update({
      where: { id: payload.userId as string },
      data: { name: validatedFields.data.name },
    });

    revalidatePath("/dashboard");
    revalidatePath("/settings");

    return { success: "Profile updated successfully!" };
  } catch (error) {
    console.error("Update Profile Error:", error);
    return { error: "Something went wrong!" };
  }
}
