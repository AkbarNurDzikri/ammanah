"use server";

import { cookies } from "next/headers";
import { decrypt } from "./auth.utils";

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  try {
    return await decrypt(session);
  } catch (error) {
    return null;
  }
}
