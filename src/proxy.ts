import { NextRequest, NextResponse } from "next/server";
// Use a lightweight way to decrypt if possible, or just check cookie existence in middleware
// to avoid heavy deps. But since we use Jose, it's fine.
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || "default_secret_key";
const key = new TextEncoder().encode(secretKey);

const publicRoutes = [
  "/login",
  "/register",
  "/verify-email",
  "/reset-password",
];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = req.cookies.get("session")?.value;

  let session = null;
  if (cookie) {
    try {
      const { payload } = await jwtVerify(cookie, key);
      session = payload;
    } catch (e) {
      session = null;
    }
  }

  // 1. If not authenticated and trying to access private route (dashboard)
  if (
    !session &&
    !isPublicRoute &&
    (path === "/" || path.startsWith("/dashboard"))
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // 2. If authenticated and trying to access public route
  if (session && (isPublicRoute || path === "/")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
