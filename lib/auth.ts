import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'studio24_admin_session';

export function getAllowedAdminEmails(): string[] {
  const envEmails = process.env.ADMIN_ALLOWED_EMAILS || 'amandangi950@gmail.com';
  return envEmails
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isValidAdminEmail(email: string): boolean {
  return getAllowedAdminEmails().includes(email.trim().toLowerCase());
}

export async function createAdminSession(email: string) {
  const cookieStore = await cookies();
  const sessionData = {
    email: email.trim().toLowerCase(),
    authenticatedAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const encoded = Buffer.from(JSON.stringify(sessionData)).toString('base64');

  cookieStore.set(SESSION_COOKIE_NAME, encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });

  return sessionData;
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) return null;

  try {
    const decoded = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString('utf-8'));
    if (decoded.expiresAt && decoded.expiresAt > Date.now()) {
      if (isValidAdminEmail(decoded.email)) {
        return { email: decoded.email };
      }
    }
  } catch (e) {
    return null;
  }

  return null;
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
