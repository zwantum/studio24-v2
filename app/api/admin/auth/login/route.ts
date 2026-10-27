import { NextRequest, NextResponse } from 'next/server';
import { isValidAdminEmail, createAdminSession } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, error: 'Email is required.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidAdminEmail(normalizedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Access denied. This email is not authorized for the Studio24 Admin Portal.' },
        { status: 403 }
      );
    }

    // Allowed passwords: ADMIN_PASSWORD from env, SMTP_PASS, or Studio24 master keys
    const validPasswords = [
      process.env.ADMIN_PASSWORD,
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

    // Set session cookie immediately for instantaneous authentication
    await createAdminSession(normalizedEmail);

    // Fast-path Supabase session sync (best effort, non-blocking if slow)
    try {
      const supabase = await createServerSupabaseClient();
      await Promise.race([
        supabase.auth.signInWithPassword({ email: normalizedEmail, password }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 1500)),
      ]);
    } catch {
      // Session cookie is already set and fully authorized, continue instantly
    }

    return NextResponse.json({
      success: true,
      message: 'Authentication successful. Welcome to Studio24 Atelier Portal.',
      user: { email: normalizedEmail },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}

