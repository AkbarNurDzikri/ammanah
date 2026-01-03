"use server";

import prisma from "@/lib/prisma";

export interface RecentUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  lastLogin: Date | null;
}

export async function getRecentLogins(limit: number = 5) {
  try {
    const users = await prisma.user.findMany({
      where: {
        lastLogin: { not: null },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        lastLogin: true,
      },
      orderBy: {
        lastLogin: "desc",
      },
      take: limit,
    });

    return {
      success: true,
      data: users,
    };
  } catch (error) {
    console.error("Recent Logins Error:", error);
    return {
      success: false,
      error: "Failed to fetch recent logins",
    };
  }
}
