"use server";

import { cookies } from "next/headers";

export async function logoutAction() {
  (await cookies()).set("session", "", { expires: new Date(0) });
  return { success: true };
}
