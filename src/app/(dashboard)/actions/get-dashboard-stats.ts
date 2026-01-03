"use server";

import prisma from "@/lib/prisma";

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  totalRoles: number;
  totalUserRoles: number;
}

export async function getDashboardStats() {
  try {
    const [
      totalUsers,
      activeUsers,
      inactiveUsers,
      verifiedUsers,
      unverifiedUsers,
      totalRoles,
      totalUserRoles,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.count({ where: { isActive: false } }),
      prisma.user.count({ where: { NOT: { emailVerified: null } } }),
      prisma.user.count({ where: { emailVerified: null } }),
      prisma.role.count(),
      prisma.userRole.count(),
    ]);

    return {
      success: true,
      data: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        verifiedUsers,
        unverifiedUsers,
        totalRoles,
        totalUserRoles,
      },
    };
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return {
      success: false,
      error: "Failed to fetch dashboard statistics",
    };
  }
}
