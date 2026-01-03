"use server";

import { SUPER_ADMIN_EMAIL, SUPER_ADMIN_ROLE } from "@/config/permissions";
import { hashPassword } from "@/lib/auth.utils";
import { sendVerificationEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import { seedPermissionsAction } from "./seed-permission.action";
import { handleDbError } from "@/lib/db-error-handler";

export async function registerAction(formData: FormData) {
  const rawEmail = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const email = rawEmail.toLowerCase();

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: "Email already registered" };

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        isActive: false,
      },
    });

    // Automatically assign SUPER_ADMIN role if it's the specified super admin email
    if (email === SUPER_ADMIN_EMAIL.toLowerCase()) {
      await seedPermissionsAction(); // Ensure permissions exist
      let superAdminRole = await prisma.role.findUnique({
        where: { name: SUPER_ADMIN_ROLE },
      });

      if (!superAdminRole) {
        superAdminRole = await prisma.role.create({
          data: {
            name: SUPER_ADMIN_ROLE,
            description: "Super Control Role",
          },
        });

        // Assign all permissions to super admin
        const allPerms = await prisma.permission.findMany();
        await prisma.rolePermission.createMany({
          data: allPerms.map((p) => ({
            roleId: superAdminRole!.id,
            permissionId: p.id,
          })),
        });
      }

      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: superAdminRole.id,
        },
      });
    }

    // Generate verification token and send email
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.verificationToken.create({
      data: { email, token, expires },
    });

    await sendVerificationEmail(email, token);

    return { success: true };
  } catch (error) {
    try {
      handleDbError(error);
    } catch (e: any) {
      return { error: e.message };
    }
    return { error: "An unexpected error occurred during registration" };
  }
}
