import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { PERMISSIONS } from "@/config/permissions";

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const adminEmail = "admin@me.id";
const adminPassword = "rahasia-123";

async function main() {
  console.log("--- START SEEDING (ADAPTER MODE) ---");

  // 1. Permissions
  console.log("Seeding permissions...");
  const permRecords = [];
  for (const p of PERMISSIONS) {
    const record = await prisma.permission.upsert({
      where: { name: p.name },
      update: { description: p.description },
      create: p,
    });
    permRecords.push(record);
  }

  // 2. Super Admin Role
  console.log("Seeding SUPER_ADMIN role...");
  const superRole = await prisma.role.upsert({
    where: { name: "SUPER_ADMIN" },
    update: {},
    create: {
      name: "SUPER_ADMIN",
      description: "Akses penuh ke sistem",
    },
  });

  // 3. Role Permissions
  console.log("Assigning permissions to role...");
  for (const perm of permRecords) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superRole.id,
          permissionId: perm.id,
        },
      },
      update: {},
      create: {
        roleId: superRole.id,
        permissionId: perm.id,
      },
    });
  }

  // 4. Super Admin User
  console.log("Seeding Super Admin user...");
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Super Admin",
      password: hashedPassword,
      emailVerified: new Date(),
      isActive: true,
    },
  });

  // 5. User Role
  console.log("Assigning role to user...");
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: user.id,
        roleId: superRole.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      roleId: superRole.id,
    },
  });

  console.log("--- SEEDING SUCCESS ---");
  console.log(`Login: ${adminEmail} / ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error("Gagal saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
