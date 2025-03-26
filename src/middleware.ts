import { withAuth } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export default withAuth(async function middleware(request: NextResponse) {}, {
  isReturnToCurrentPage: true,
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - login
     * - images
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
