/**
 * @file Middleware for Authentication
 * @description Handles authentication checks for protected routes, ensuring only
 *              authenticated users can access certain pages.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/services/auth/auth";

const protectedRoutes = ["/dashboard"];

/**
 * Middleware Function
 * @description Checks if the user is authenticated before accessing protected routes.
 *              Redirects unauthenticated users to the sign-in page.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} A response that either allows access or redirects to the sign-in page.
 */
export default async function middleware(request: NextRequest) {
  const session = await auth();
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}
