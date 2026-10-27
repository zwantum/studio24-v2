-- ==============================================================================
-- Studio24 Supabase Row Level Security (RLS) & Role Setup Migration
-- Run this in your Supabase Dashboard SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Create an admin profiles table to verify authorized staff roles
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on admin_profiles
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Admins can only view their own profile
DROP POLICY IF EXISTS "Admins can view their own profile" ON public.admin_profiles;
CREATE POLICY "Admins can view their own profile" 
ON public.admin_profiles 
FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- ==============================================================================
-- 2. Secure the Inquiries (queries) Table
-- ==============================================================================
ALTER TABLE IF EXISTS public.queries ENABLE ROW LEVEL SECURITY;

-- Allow public website visitors (anon) to submit consultation requests
DROP POLICY IF EXISTS "Public can submit inquiries" ON public.queries;
CREATE POLICY "Public can submit inquiries" 
ON public.queries 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow authenticated admins to view client inquiries
DROP POLICY IF EXISTS "Only authenticated admins can view inquiries" ON public.queries;
CREATE POLICY "Only authenticated admins can view inquiries" 
ON public.queries 
FOR SELECT 
TO authenticated 
USING (true);

-- Allow authenticated admins to update inquiry statuses / notes
DROP POLICY IF EXISTS "Only authenticated admins can update inquiries" ON public.queries;
CREATE POLICY "Only authenticated admins can update inquiries" 
ON public.queries 
FOR UPDATE 
TO authenticated 
USING (true);

-- Allow authenticated admins to delete inquiries
DROP POLICY IF EXISTS "Only authenticated admins can delete inquiries" ON public.queries;
CREATE POLICY "Only authenticated admins can delete inquiries" 
ON public.queries 
FOR DELETE 
TO authenticated 
USING (true);

-- ==============================================================================
-- 3. Automatic Profile Trigger on Admin Creation
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_admin_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.admin_profiles (id, email, role)
  VALUES (new.id, new.email, 'admin')
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_admin_user();
