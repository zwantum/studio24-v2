import { createBlogClient, SupabaseDatabaseAdapter, MemoryDatabaseAdapter } from '@zwantum/blog/core';
import { SupabaseStorageAdapter } from '@zwantum/blog/storage';
import { supabase, supabaseAdmin } from './supabase';
import type { Post } from '@zwantum/blog/types';

// Global singleton for memory fallback
declare global {
  var __studio24_blog_client: ReturnType<typeof createBlogClient> | undefined;
}

function createClientInstance() {
  const isServer = typeof window === 'undefined';
  const clientToUse = isServer ? supabaseAdmin : supabase;

  // We default to SupabaseDatabaseAdapter
  // If the user hasn't run the migration yet, the MemoryDatabaseAdapter is available as fallback
  const dbAdapter = new SupabaseDatabaseAdapter(clientToUse as any);
  const storageAdapter = new SupabaseStorageAdapter(clientToUse as any, { defaultBucket: 'media' });

  return createBlogClient({
    db: dbAdapter,
    storage: storageAdapter,
  });
}

export const blogClient = global.__studio24_blog_client || createClientInstance();
if (process.env.NODE_ENV !== 'production') {
  global.__studio24_blog_client = blogClient;
}
