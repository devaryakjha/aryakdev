import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (process.env.VERCEL_ENV === "preview") {
    response.headers.set("x-robots-tag", "noindex");
  }

  return response;
}
