import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter for serverless environment
const requestLog = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function sanitizeInput(str: string): string {
  return str.replace(/<[^>]*>?/gm, '').trim();
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous';
    const now = Date.now();
    const clientRecord = requestLog.get(ip);

    if (clientRecord && now - clientRecord.timestamp < RATE_LIMIT_WINDOW) {
      if (clientRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            success: false,
            error: 'Too many requests. Please wait a moment before booking another consultation.',
          },
          { status: 429 }
        );
      }
      clientRecord.count += 1;
    } else {
      requestLog.set(ip, { count: 1, timestamp: now });
    }

    const body = await req.json();
    const { fullName, phone, serviceType, propertyConfig, locationBudget, notes } = body;

    // Validate Full Name
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid full name (2 to 100 characters).' },
        { status: 400 }
      );
    }

    // Validate Phone Number
    const cleanedPhone = typeof phone === 'string' ? phone.trim().replace(/[\s-]/g, '') : '';
    const phoneRegex = /^(\+?\d{1,4})?(\d{10})$/;
    if (!phone || !phoneRegex.test(cleanedPhone)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit phone number.' },
        { status: 400 }
      );
    }

    // Validated payload ready for CRM / Email / DB integration
    const sanitizedData = {
      fullName: sanitizeInput(fullName),
      phone: sanitizeInput(phone),
      serviceType: sanitizeInput(serviceType || 'Full Turnkey Residential'),
      propertyConfig: sanitizeInput(propertyConfig || '3BHK Apartment (1,500 - 2,400 sq.ft)'),
      locationBudget: sanitizeInput(locationBudget || ''),
      notes: sanitizeInput(notes || ''),
      submittedAt: new Date().toISOString(),
    };

    // Save inquiry to Supabase queries table
    let savedRecord = null;
    try {
      const { createInquiry } = await import('@/lib/inquiries');
      savedRecord = await createInquiry({
        fullName: sanitizedData.fullName,
        phone: sanitizedData.phone,
        serviceType: sanitizedData.serviceType,
        propertyConfig: sanitizedData.propertyConfig,
        locationBudget: sanitizedData.locationBudget,
        notes: sanitizedData.notes,
      });
    } catch (dbErr) {
      console.error('Failed to write to Supabase queries table:', dbErr);
    }

    // Trigger email alert to admin
    try {
      const { sendConsultationNotification } = await import('@/lib/email');
      await sendConsultationNotification({
        fullName: sanitizedData.fullName,
        phone: sanitizedData.phone,
        serviceType: sanitizedData.serviceType,
        propertyConfig: sanitizedData.propertyConfig,
        locationBudget: sanitizedData.locationBudget,
        notes: sanitizedData.notes,
      });
    } catch (mailErr) {
      console.error('Failed to send lead email alert:', mailErr);
    }

    // Return production-grade success receipt
    return NextResponse.json({
      success: true,
      message: 'Thank you. Studio24 design concierge will contact you within 24 hours.',
      data: {
        id: savedRecord?.id || undefined,
        fullName: sanitizedData.fullName,
        serviceType: sanitizedData.serviceType,
        submittedAt: sanitizedData.submittedAt,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while processing your request. Please try again.',
      },
      { status: 500 }
    );
  }
}
