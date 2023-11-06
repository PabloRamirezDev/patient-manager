import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CONFIG } from "./app/lib/config";

export function middleware(request: NextRequest) {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/patients", request.url));
  }

  if (CONFIG.NODE_ENV === "production") {
    url.pathname = url.pathname.replace(`/${CONFIG.PAGES_SLUG}`, "");
  }
  
  return NextResponse.rewrite(url);
}
