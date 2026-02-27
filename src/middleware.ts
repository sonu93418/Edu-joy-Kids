import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Route protection configuration
const protectedRoutes: Record<string, string[]> = {
  '/student': ['student'],
  '/parent': ['parent'],
  '/teacher': ['teacher'],
  '/admin': ['admin'],
  '/school': ['school_admin', 'admin'],
};

const authRoutes = ['/auth/login', '/auth/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookie
  const token = request.cookies.get('accessToken')?.value;
  const userRole = request.cookies.get('userRole')?.value;

  // Redirect authenticated users away from auth pages
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (token && userRole) {
      const dashboardMap: Record<string, string> = {
        student: '/student',
        parent: '/parent',
        teacher: '/teacher',
        admin: '/admin',
        school_admin: '/school',
      };
      const redirect = dashboardMap[userRole] || '/';
      return NextResponse.redirect(new URL(redirect, request.url));
    }
    return NextResponse.next();
  }

  // Check protected routes
  for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      if (!token) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
      if (userRole && !allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard
        const dashboardMap: Record<string, string> = {
          student: '/student',
          parent: '/parent',
          teacher: '/teacher',
          admin: '/admin',
          school_admin: '/school',
        };
        const correctDashboard = dashboardMap[userRole] || '/';
        return NextResponse.redirect(new URL(correctDashboard, request.url));
      }
      break;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/student/:path*',
    '/parent/:path*',
    '/teacher/:path*',
    '/admin/:path*',
    '/school/:path*',
    '/auth/:path*',
  ],
};
