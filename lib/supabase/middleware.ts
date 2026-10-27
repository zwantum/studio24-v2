import { NextResponse, type NextRequest } from 'next/server';

function getAllowedAdminEmails(): string[] {
  const envEmails = process.env.ADMIN_ALLOWED_EMAILS || 'amandangi950@gmail.com';
  return envEmails
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';
  const isAdminApiRoute = pathname.startsWith('/api/admin');
  const isAuthApiRoute = pathname.startsWith('/api/admin/auth');

  // Fast-path: Check cookies locally (0ms, 0 external network requests)
  const legacyCookie = request.cookies.get('studio24_admin_session');
  let isAuthenticated = false;

  if (legacyCookie?.value) {
    try {
      const decoded = JSON.parse(Buffer.from(legacyCookie.value, 'base64').toString('utf-8'));
      if (decoded.expiresAt && decoded.expiresAt > Date.now()) {
        const allowed = getAllowedAdminEmails();
        if (allowed.includes(decoded.email?.toLowerCase())) {
          isAuthenticated = true;
        }
      }
    } catch {
      isAuthenticated = false;
    }
  }

  // Check if Supabase auth cookie exists if legacy is not present
  if (!isAuthenticated) {
    const hasSupabaseToken = request.cookies.getAll().some(
      (c) => c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
    );
    if (hasSupabaseToken) {
      isAuthenticated = true;
    }
  }

  // Protect Admin API routes
  if (isAdminApiRoute && !isAuthApiRoute) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin authentication required.' },
        { status: 401 }
      );
    }
  }

  // Protect Admin UI pages
  if (isAdminRoute) {
    if (!isLoginPage && !isAuthenticated) {
      // Normal user trying to access admin pages -> redirect immediately to login (0ms)
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    if (isLoginPage && isAuthenticated) {
      // Already authenticated admin trying to view login page -> redirect to dashboard (0ms)
      const url = request.nextUrl.clone();
      url.pathname = '/admin/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next({ request });
}
