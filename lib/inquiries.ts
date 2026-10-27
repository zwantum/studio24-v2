import { supabaseAdmin } from './supabase';

export interface Inquiry {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  service: string;
  city: string | null;
  project_details: string | null;
  status: 'New' | 'In Progress' | 'Resolved';
  created_at: string;
  admin_notes?: string | null;
}

export const SERVICE_SECTIONS = [
  'All Sections',
  'Full Turnkey Residential',
  'Modular Kitchen & Wardrobes',
  'Commercial Office Atelier',
  'Complete Home Renovation',
  'Design & 3D Consultation Only',
] as const;

export const INQUIRY_STATUSES = [
  'All',
  'New',
  'In Progress',
  'Resolved',
] as const;

export async function getInquiries(params?: {
  section?: string;
  status?: string;
  search?: string;
  limit?: number;
}) {
  try {
    let query = supabaseAdmin
      .from('queries')
      .select('*')
      .order('created_at', { ascending: false });

    if (params?.section && params.section !== 'All Sections') {
      query = query.ilike('service', `%${params.section}%`);
    }

    if (params?.status && params.status !== 'All') {
      query = query.eq('status', params.status);
    }

    if (params?.search) {
      const s = params.search.trim();
      query = query.or(`full_name.ilike.%${s}%,phone.ilike.%${s}%,city.ilike.%${s}%,project_details.ilike.%${s}%`);
    }

    if (params?.limit) {
      query = query.limit(params.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data || []) as Inquiry[];
  } catch (err) {
    console.error('Error fetching inquiries from Supabase:', err);
    return [];
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  const { data, error } = await supabaseAdmin
    .from('queries')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteInquiry(id: string) {
  const { error } = await supabaseAdmin
    .from('queries')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

export async function createInquiry(payload: {
  fullName: string;
  phone: string;
  email?: string;
  serviceType: string;
  propertyConfig?: string;
  locationBudget?: string;
  notes?: string;
}) {
  const details = [
    payload.propertyConfig ? `Config: ${payload.propertyConfig}` : null,
    payload.notes ? `Notes: ${payload.notes}` : null,
  ].filter(Boolean).join(' | ');

  const { data, error } = await supabaseAdmin
    .from('queries')
    .insert([
      {
        full_name: payload.fullName,
        phone: payload.phone,
        email: payload.email || null,
        service: payload.serviceType,
        city: payload.locationBudget || null,
        project_details: details || null,
        status: 'New',
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}
