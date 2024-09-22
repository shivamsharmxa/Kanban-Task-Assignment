// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Ensure that the middleware applies to all routes except those specified
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
