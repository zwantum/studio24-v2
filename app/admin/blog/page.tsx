'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  FileText,
  Database,
  ExternalLink,
  Search,
  Eye,
  CheckCircle2,
  Copy,
  Plus,
  RefreshCw,
  Layers,
  Tag,
  Calendar,
  Clock,
  X,
  Code2,
} from 'lucide-react';
import { blogClient } from '@/lib/blogClient';
import type { Studio24Post } from '@/lib/blogData';
import '@/styles/zwantum-blog.css';

// Dynamically import BlogAdmin to keep SSR optimal
const BlogAdmin = dynamic(
  () => import('@zwantum/blog/admin').then((mod) => mod.BlogAdmin),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center p-16 text-center">
        <RefreshCw className="w-8 h-8 text-[#A6A182] animate-spin mb-4" />
        <p className="text-zinc-400 font-mono text-sm">Loading ZwantumBlog Admin Engine...</p>
      </div>
    ),
  }
);

export default function AdminBlogPage() {
  const [activeTab, setActiveTab] = useState<'directory' | 'zwantum' | 'database'>('directory');
  const [posts, setPosts] = useState<Studio24Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hasZwantumSchema, setHasZwantumSchema] = useState(false);
  const [previewPost, setPreviewPost] = useState<Studio24Post | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog');
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
        setHasZwantumSchema(!!data.hasZwantumSchema);
      }
    } catch (err) {
      console.error('Failed to load admin blog posts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const categories = Array.from(
    new Set(posts.map((p) => p.categories?.[0]?.name).filter(Boolean))
  ) as string[];

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      (p.excerpt && p.excerpt.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' ||
      p.categories?.[0]?.name.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleCopySqlPath = () => {
    navigator.clipboard.writeText('database/apply_all.sql');
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-normal text-white tracking-wide">
            Blog Management
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 font-sans mt-1">
            Manage articles, categories, and blog publications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase text-zinc-300 border border-white/10 hover:border-[#A6A182]/50 hover:text-white transition-all duration-200"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#A6A182]" />
            View Public Blog
          </Link>

          <button
            onClick={() => setActiveTab('zwantum')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase bg-[#A6A182] text-black font-medium hover:bg-[#b8b394] transition-all duration-200 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            New Dispatch
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#121215] border border-white/[0.06] p-4 flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            Total Articles
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl font-light text-white font-serif">{posts.length}</span>
            <FileText className="w-4 h-4 text-[#A6A182]/60" />
          </div>
        </div>

        <div className="bg-[#121215] border border-white/[0.06] p-4 flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            Published Live
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl font-light text-emerald-400 font-serif">{posts.length}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400/60" />
          </div>
        </div>

        <div className="bg-[#121215] border border-white/[0.06] p-4 flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            Active Categories
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-2xl font-light text-white font-serif">{categories.length}</span>
            <Tag className="w-4 h-4 text-[#A6A182]/60" />
          </div>
        </div>

        <div className="bg-[#121215] border border-white/[0.06] p-4 flex flex-col justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            Blog Status
          </span>
          <div className="flex items-baseline justify-between mt-3">
            <span className="text-sm font-mono text-zinc-200">
              {hasZwantumSchema ? 'Connected' : 'Active'}
            </span>
            <FileText className="w-4 h-4 text-[#A6A182]/60" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] overflow-x-auto">
        <button
          onClick={() => setActiveTab('directory')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-200 border-b-2 -mb-[1px] ${
            activeTab === 'directory'
              ? 'border-[#A6A182] text-white bg-white/[0.02]'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#A6A182]" />
          Articles Directory ({posts.length})
        </button>

        <button
          onClick={() => setActiveTab('zwantum')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-200 border-b-2 -mb-[1px] ${
            activeTab === 'zwantum'
              ? 'border-[#A6A182] text-white bg-white/[0.02]'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-[#A6A182]" />
          Blog Editor
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-200 border-b-2 -mb-[1px] ${
            activeTab === 'database'
              ? 'border-[#A6A182] text-white bg-white/[0.02]'
              : 'border-transparent text-zinc-400 hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-[#A6A182]" />
          Schema & Migration
        </button>
      </div>

      {/* Tab 1: Articles Directory */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#121215] border border-white/[0.06] p-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search articles by title, slug, or content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#18181b] border border-white/[0.08] text-white text-xs pl-9 pr-4 py-2 font-mono focus:outline-none focus:border-[#A6A182] placeholder:text-zinc-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase text-zinc-500 whitespace-nowrap">
                Category:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#18181b] border border-white/[0.08] text-white text-xs px-3 py-2 font-mono focus:outline-none focus:border-[#A6A182]"
              >
                <option value="all">All Categories ({posts.length})</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <button
                onClick={fetchPosts}
                disabled={loading}
                className="p-2 border border-white/[0.08] text-zinc-400 hover:text-white hover:border-[#A6A182]/50 transition-colors"
                title="Refresh Articles"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Articles Table */}
          <div className="border border-white/[0.08] bg-[#121215] overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#18181b] border-b border-white/[0.08] text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="py-3.5 px-4 font-normal">Article Title</th>
                  <th className="py-3.5 px-4 font-normal">Category</th>
                  <th className="py-3.5 px-4 font-normal">Author</th>
                  <th className="py-3.5 px-4 font-normal">Read Time</th>
                  <th className="py-3.5 px-4 font-normal">Date</th>
                  <th className="py-3.5 px-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-500 font-mono text-xs">
                      <RefreshCw className="w-5 h-5 text-[#A6A182] animate-spin mx-auto mb-2" />
                      Loading articles from Supabase...
                    </td>
                  </tr>
                ) : filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-500 font-mono text-xs">
                      No articles match your search or category filter.
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="py-3.5 px-4 max-w-md">
                        <p className="font-serif text-sm text-zinc-100 font-normal line-clamp-1 group-hover:text-white">
                          {post.title}
                        </p>
                        <p className="text-[11px] font-mono text-zinc-500 mt-0.5 truncate">
                          /blog/{post.slug}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-white/[0.04] text-zinc-300 border border-white/10">
                          {post.categories?.[0]?.name || 'Interior'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-zinc-400 font-mono text-[11px]">
                        {post.author?.name || 'Shreya'}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-zinc-400 font-mono text-[11px]">
                        {post.readtime_label || `${post.reading_time || 5} min read`}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-zinc-500 font-mono text-[11px]">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Published'}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setPreviewPost(post)}
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                            title="Preview Content"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-1.5 text-[#A6A182] hover:text-[#c4be9e] hover:bg-white/[0.04] transition-colors"
                            title="View Public Post"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Blog Editor */}
      {activeTab === 'zwantum' && (
        <div className="space-y-6">
          <div className="bg-[#121215] border border-white/[0.08] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#A6A182]" />
              <div>
                <h3 className="text-sm font-medium text-white">Blog Editor</h3>
                <p className="text-xs text-zinc-400">
                  Compose articles, manage media assets, revisions, and categories.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#121215] border border-white/[0.08] p-6 rounded-none min-h-[600px] overflow-hidden">
            <BlogAdmin
              client={blogClient}
              title="Studio 24 Atelier Blog"
              subtitle="Architectural dispatches & perspectives"
              siteUrl={process.env.NEXT_PUBLIC_BASE_URL || 'https://staging.studio24byshreya.com'}
              basePath="/blog"
            />
          </div>
        </div>
      )}

      {/* Tab 3: Database & Migration */}
      {activeTab === 'database' && (
        <div className="space-y-6 max-w-4xl">
          <div className="bg-[#121215] border border-white/[0.08] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#A6A182]" />
                <h3 className="text-lg font-serif text-white">Database Migration & Schema Status</h3>
              </div>
              <span
                className={`text-[11px] font-mono px-2.5 py-1 border uppercase ${
                  hasZwantumSchema
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                    : 'bg-amber-950/40 border-amber-500/30 text-amber-400'
                }`}
              >
                {hasZwantumSchema ? 'ZwantumBlog Schema Active' : 'Migration Pending in Supabase'}
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Studio24 is currently operating in a resilient hybrid mode: all 46 existing published articles from the Supabase <code className="text-[#A6A182] font-mono bg-white/[0.04] px-1.5 py-0.5">posts</code> table are fully live on the website.
              To enable advanced ZwantumBlog features (Tiptap revisions, media library buckets, comments, and redirects), execute the master migration script in your Supabase SQL editor.
            </p>

            <div className="border border-white/[0.08] bg-[#09090b] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-zinc-200">
                  Migration File: <span className="text-[#A6A182]">database/apply_all.sql</span>
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Contains all 14 structured ZwantumBlog migrations with indexes and RLS policies.
                </p>
              </div>

              <button
                onClick={handleCopySqlPath}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 transition-colors whitespace-nowrap"
              >
                <Copy className="w-3.5 h-3.5 text-[#A6A182]" />
                {copiedSql ? 'Copied Path!' : 'Copy File Path'}
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Setup Instructions:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-xs text-zinc-400 font-sans">
                <li>
                  Open your <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-[#A6A182] underline underline-offset-4">Supabase Dashboard</a> and select the Studio24 project.
                </li>
                <li>Navigate to the <strong>SQL Editor</strong> tab on the left sidebar.</li>
                <li>Copy the contents of <code className="text-zinc-200 font-mono bg-white/[0.04] px-1 py-0.5">database/apply_all.sql</code> from this repository.</li>
                <li>Paste the script into the SQL Editor and click <strong>Run</strong>.</li>
                <li>Return here and refresh to enjoy full native ZwantumBlog capabilities!</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Preview Article Modal */}
      {previewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#121215] border border-white/10 w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/[0.08] bg-[#18181b]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-[#A6A182]/10 text-[#A6A182] border border-[#A6A182]/20">
                  {previewPost.categories?.[0]?.name || 'Interior'}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {previewPost.readtime_label || '5 min read'}
                </span>
              </div>
              <button
                onClick={() => setPreviewPost(null)}
                className="text-zinc-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <h2 className="text-xl md:text-2xl font-serif text-white leading-snug">
                {previewPost.title}
              </h2>

              <p className="text-xs font-mono text-zinc-500">
                Author: {previewPost.author?.name || 'Shreya'} • Published: {previewPost.published_at ? new Date(previewPost.published_at).toLocaleDateString() : 'Published'}
              </p>

              {previewPost.featured_image?.url && (
                <div className="relative aspect-video w-full overflow-hidden border border-white/10 bg-zinc-900">
                  <img
                    src={previewPost.featured_image.url}
                    alt={previewPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className="prose prose-invert prose-zinc max-w-none text-xs md:text-sm text-zinc-300 leading-relaxed font-sans pt-4 border-t border-white/[0.06]"
                dangerouslySetInnerHTML={{
                  __html: typeof previewPost.content === 'string' ? previewPost.content : JSON.stringify(previewPost.content),
                }}
              />
            </div>

            <div className="p-4 border-t border-white/[0.08] bg-[#18181b] flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-500 truncate">
                /blog/{previewPost.slug}
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href={`/blog/${previewPost.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase bg-[#A6A182] text-black font-medium hover:bg-[#b8b394] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Public Page
                </Link>
                <button
                  onClick={() => setPreviewPost(null)}
                  className="px-3 py-1.5 text-xs font-mono uppercase text-zinc-400 hover:text-white border border-white/10"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
