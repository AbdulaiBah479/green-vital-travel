import { NextResponse, type NextRequest } from "next/server";
import { TOOLS_COOKIE_NAME, isValidSession } from "@/lib/toolsAuth";

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get(TOOLS_COOKIE_NAME)?.value;
  if (await isValidSession(cookie)) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/tools/login", request.url));
}

export const config = {
  matcher: ["/tools/itinerary"],
};
