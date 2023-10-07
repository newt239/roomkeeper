import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/:path*"],
};

export function middleware(req: NextRequest) {
  if (!process.env.BASIC_AUTH_PASSWORD) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1] ?? "";
    const [user, pwd] = atob(authValue).split(":");

    if (
      user === process.env.BASIC_AUTH_ADMIN_USER &&
      pwd === process.env.BASIC_AUTH_ADMIN_PASSWORD
    ) {
      return NextResponse.next();
    } else if (
      user === process.env.BASIC_AUTH_USER &&
      pwd === process.env.BASIC_AUTH_PASSWORD
    ) {
      if (!url.pathname.startsWith("/admin")) {
        return NextResponse.next();
      }
    }
  }
  url.pathname = "/api/basic-auth";

  return NextResponse.rewrite(url);
}
