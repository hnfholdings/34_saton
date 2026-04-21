import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isAuthorized(authHeader: string | null, expectedUser: string, expectedPassword: string): boolean {
  if (!authHeader) {
    return false;
  }

  const [scheme, encoded] = authHeader.split(" ");

  if (scheme !== "Basic" || !encoded) {
    return false;
  }

  try {
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex < 0) {
      return false;
    }

    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);

    return username === expectedUser && password === expectedPassword;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const adminUser = process.env.ADMIN_BASIC_AUTH_USER;
  const adminPassword = process.env.ADMIN_BASIC_AUTH_PASSWORD;

  // Fail closed in production when auth is not configured.
  if (!adminUser || !adminPassword) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Admin authentication is not configured.", { status: 500 });
    }

    return NextResponse.next();
  }

  if (isAuthorized(request.headers.get("authorization"), adminUser, adminPassword)) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
