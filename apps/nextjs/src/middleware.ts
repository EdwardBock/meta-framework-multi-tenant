import { MiddlewareConfig, type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  const hostname = String(request.headers.get("x-forwarded-host")?.split(":")[0]);

  return NextResponse.rewrite(new URL(`/tenant/${hostname}${pathname}?${searchParams.toString()}`, request.url));
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|themes|_next|[\\w-]+\\.\\w+).*)',
  ],
}
