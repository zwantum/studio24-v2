import { NextResponse } from 'next/server';
import { destroyAdminSession } from '@/lib/auth';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
  } catch (e) {
    // Continue even if Supabase signout errors
  }
  await destroyAdminSession();
  return NextResponse.json({ success: true, message: 'Logged out successfully.' });
}

