'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Inbox,
  BookOpen,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Form Inquiries', href: '/admin/inquiries', icon: Inbox },
  { name: 'Blog / Publication', href: '/admin/blog', icon: BookOpen },
];

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
        <div>
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
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A6A182] font-semibold">
                  Atelier Concierge
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions & User Coordinates */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors border border-white/5 hover:border-white/20"
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
              className="p-2 border border-white/10 hover:border-red-500/50 hover:bg-red-950/20 text-zinc-400 hover:text-red-300 transition-colors shrink-0"
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
