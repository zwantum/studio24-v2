'use client';

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  PenSquare,
  Folder,
  Users,
  Image as ImageIcon,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const blogSubItems = [
  { name: 'Overview', view: 'overview', icon: LayoutDashboard },
  { name: 'All Posts', view: 'posts', icon: FileText },
  { name: 'Add New Post', view: 'new-post', icon: PenSquare },
  { name: 'Categories', view: 'categories', icon: Folder },
  { name: 'Authors', view: 'authors', icon: Users },
  { name: 'Media Library', view: 'media', icon: ImageIcon },
  { name: 'Blog Settings', view: 'settings', icon: Settings },
];

function AdminNavContent({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isBlogRoute = pathname.startsWith('/admin/blog');
  const [isBlogOpen, setIsBlogOpen] = useState(true);

  // Keep blog menu open when on blog route
  useEffect(() => {
    if (isBlogRoute) {
      setIsBlogOpen(true);
    }
  }, [isBlogRoute]);

  const currentBlogView = isBlogRoute ? searchParams.get('view') || 'overview' : '';

  return (
    <nav className="p-4 space-y-1.5">
      {/* 1. Dashboard */}
      <Link
        href="/admin/dashboard"
        onClick={() => setMobileMenuOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-200 rounded-none ${
          pathname === '/admin/dashboard'
            ? 'bg-white text-black font-semibold shadow-md'
            : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
        }`}
      >
        <LayoutDashboard className="w-4 h-4 shrink-0" />
        <span>Dashboard</span>
      </Link>

      {/* 2. Form Inquiries */}
      <Link
        href="/admin/inquiries"
        onClick={() => setMobileMenuOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-200 rounded-none ${
          pathname.startsWith('/admin/inquiries')
            ? 'bg-white text-black font-semibold shadow-md'
            : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
        }`}
      >
        <Inbox className="w-4 h-4 shrink-0" />
        <span>Form Inquiries</span>
      </Link>

      {/* 3. Blog Articles (Collapsible Module matching Reference) */}
      <div className="pt-1">
        <Link
          href="/admin/blog?view=overview"
          onClick={() => {
            setIsBlogOpen(true);
            setMobileMenuOpen(false);
          }}
          className={`w-full flex items-center justify-between px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-200 rounded-none cursor-pointer ${
            isBlogRoute
              ? 'bg-white text-black font-semibold shadow-md'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Blog Articles</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsBlogOpen(!isBlogOpen);
            }}
            className="p-1 -mr-1 hover:bg-black/10 rounded-none shrink-0 transition-transform duration-200"
            title="Toggle submenu"
          >
            {isBlogOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </Link>

        {/* Sub-Items */}
        {isBlogOpen && (
          <div className="flex flex-col gap-1 mt-1 pl-3 pr-1 py-1 border-l border-white/10 ml-4">
            {blogSubItems.map((sub) => {
              const Icon = sub.icon;
              const isActive = isBlogRoute && currentBlogView === sub.view;

              return (
                <Link
                  key={sub.view}
                  href={`/admin/blog?view=${sub.view}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs font-sans tracking-wide transition-all duration-150 rounded-none ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{sub.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Do not wrap the login page in the dashboard shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      router.push('/admin/login');
    }
  };



  return (
    <div className="min-h-screen bg-[#09090b] text-[#f5f5f7] flex flex-col md:flex-row antialiased">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[#121215] border-b border-white/10 sticky top-0 z-40">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="relative h-7 w-28">
            <Image src="/Studio24_Logo.webp" alt="Studio24" fill className="object-contain object-left" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A6A182] border border-[#A6A182]/30 px-1.5 py-0.5">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 border border-white/20 text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Desktop / Collapsible Mobile Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:flex flex-col w-full md:w-64 lg:w-72 bg-[#101013] border-b md:border-b-0 md:border-r border-white/10 shrink-0 sticky top-0 h-auto md:h-screen z-30 justify-between`}
      >
        <div className="overflow-y-auto">
          {/* Brand Wordmark & Tag */}
          <div className="p-6 border-b border-white/10 hidden md:block">
            <Link href="/admin/dashboard" className="block group">
              <div className="relative h-8 w-36 mb-2">
                <Image
                  src="/Studio24_Logo.webp"
                  alt="Studio24 by Shreya"
                  fill
                  className="object-contain object-left transition-opacity group-hover:opacity-85"
                />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-medium">
                Admin Panel
              </span>
            </Link>
          </div>

          {/* Navigation Links inside Suspense for useSearchParams */}
          <Suspense fallback={<div className="p-4 text-xs text-zinc-500">Loading navigation...</div>}>
            <AdminNavContent
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </Suspense>
        </div>

        {/* Bottom Actions & User Coordinates */}
        <div className="p-4 border-t border-white/10 space-y-3 shrink-0 bg-[#101013]">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors border border-white/5 hover:border-white/20 rounded-md"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-xs text-white font-medium truncate">Principal Admin</span>
              <span className="text-[10px] font-mono text-zinc-400 truncate">amandangi950@gmail.com</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 border border-white/10 hover:border-red-500/50 hover:bg-red-950/20 text-zinc-400 hover:text-red-300 transition-colors shrink-0 rounded-md cursor-pointer"
              title="Logout from Admin Portal"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
