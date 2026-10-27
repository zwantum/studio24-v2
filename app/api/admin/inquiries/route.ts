import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';
import { getInquiries, updateInquiryStatus, deleteInquiry } from '@/lib/inquiries';

export async function GET(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const section = searchParams.get('section') || undefined;
  const status = searchParams.get('status') || undefined;
  const search = searchParams.get('search') || undefined;
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  const data = await getInquiries({ section, status, search, limit });
  return NextResponse.json({ success: true, inquiries: data });
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'ID and status required' }, { status: 400 });
    }

    const updated = await updateInquiryStatus(id, status);
    return NextResponse.json({ success: true, inquiry: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let id: string | null = null;
    const { searchParams } = new URL(req.url);
    id = searchParams.get('id');

    if (!id) {
      try {
        const body = await req.json();
        id = body?.id || null;
      } catch {
        // body not provided or not JSON
      }
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    }

    await deleteInquiry(id);
    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
