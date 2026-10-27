import { NextRequest, NextResponse } from 'next/server';
import { isValidAdminEmail, createAdminSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, error: 'Email is required.' }, { status: 400 });
    }

    if (!isValidAdminEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Access denied. This email is not authorized for the Studio24 Admin Portal.' },
        { status: 403 }
      );
    }

    // Allowed passwords: SMTP_PASS from env, or Studio24 master keys
    const validPasswords = [
      process.env.SMTP_PASS,
      'AIndia@007100',
      'Studio24@Admin',
      'Studio24@2026',
    ].filter(Boolean);

    if (!password || !validPasswords.includes(password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin credentials provided.' },
        { status: 401 }
      );
    }

    await createAdminSession(email);

    return NextResponse.json({
      success: true,
      message: 'Authentication successful. Welcome to Studio24 Atelier Portal.',
      user: { email: email.trim().toLowerCase() },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}
