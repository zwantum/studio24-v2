'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Inbox,
  Clock,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Phone,
  RefreshCw,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { Inquiry } from '@/lib/inquiries';

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsCount, setPostsCount] = useState(5);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setInquiries(json.inquiries || []);
        }
      }
    } catch (err) {
      console.error('Failed to load inquiries for dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Compute metrics
  const total = inquiries.length;
  const newLeads = inquiries.filter((i) => i.status === 'New').length;
  const inProgress = inquiries.filter((i) => i.status === 'In Progress').length;
  const closed = inquiries.filter((i) => i.status === 'Resolved').length;

  // Group by service section
  const sectionCounts: Record<string, number> = {
    'Full Turnkey Residential': 0,
    'Modular Kitchen & Wardrobes': 0,
    'Commercial Office Atelier': 0,
    'Complete Home Renovation': 0,
    'Design & 3D Consultation Only': 0,
  };

  inquiries.forEach((item) => {
    for (const key of Object.keys(sectionCounts)) {
      if (item.service?.toLowerCase().includes(key.toLowerCase())) {
        sectionCounts[key]++;
        return;
      }
    }
    // Fallback if not matching standard keys
    sectionCounts['Full Turnkey Residential']++;
  });

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
            Overview of consultation inquiries and blog publications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="px-3.5 py-2.5 bg-[#141418] border border-white/10 hover:border-white/30 text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <Link
            href="/admin/inquiries"
            className="px-4 py-2.5 bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-zinc-200 transition-colors shadow-md flex items-center gap-2"
          >
            <span>Section Inquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Inquiries */}
        <div className="p-5 sm:p-6 bg-[#121215] border border-white/10 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Total Inquiries</span>
            <div className="w-8 h-8 rounded-none bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
              <Inbox className="w-4 h-4 text-[#A6A182]" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">{total}</div>
            <span className="text-[11px] text-zinc-400 font-light mt-1 block">Total received</span>
          </div>
        </div>

        {/* New Leads */}
        <div className="p-5 sm:p-6 bg-[#121215] border border-white/10 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-300">New Leads</span>
            <div className="w-8 h-8 rounded-none bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">{newLeads}</div>
            <span className="text-[11px] text-zinc-400 font-light mt-1 block">Requires response</span>
          </div>
        </div>

        {/* Active Pipeline */}
        <div className="p-5 sm:p-6 bg-[#121215] border border-white/10 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-300">In Pipeline</span>
            <div className="w-8 h-8 rounded-none bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-300">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">{inProgress}</div>
            <span className="text-[11px] text-zinc-400 font-light mt-1 block">In progress</span>
          </div>
        </div>

        {/* Blog Publication */}
        <div className="p-5 sm:p-6 bg-[#121215] border border-white/10 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">Blog Articles</span>
            <div className="w-8 h-8 rounded-none bg-white/[0.04] border border-white/10 flex items-center justify-center text-zinc-300">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">{postsCount}</div>
            <span className="text-[11px] text-zinc-400 font-light mt-1 block">Published posts</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Section Distribution & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Service Section Breakdown */}
        <div className="lg:col-span-7 bg-[#121215] border border-white/10 p-6 sm:p-7">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <h2 className="font-sans text-lg font-semibold text-white">Inquiries by Service Section</h2>
              <p className="text-xs text-zinc-400 mt-0.5 font-light">Client volume across Studio24 project tiers</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-mono uppercase tracking-wider text-[#A6A182] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {Object.entries(sectionCounts).map(([service, count]) => {
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={service} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-200 font-medium">{service}</span>
                    <span className="font-mono text-zinc-400">
                      {count} leads ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#1c1c20] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#A6A182] to-white transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Quick Links & ZwantumBlog Publication Status */}
        <div className="lg:col-span-5 space-y-6">
          {/* Blog Management Card */}
          <div className="bg-[#121215] border border-white/10 p-6 sm:p-7 relative overflow-hidden">
            <div className="mb-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
                Blog Management
              </span>
            </div>
            <h3 className="font-sans text-xl font-semibold text-white mb-2">Blog Articles</h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed mb-6">
              Create, edit, and manage articles, categories, and tags.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/admin/blog"
                className="w-full sm:w-auto px-4 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>Manage Blog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/blog"
                target="_blank"
                className="w-full sm:w-auto px-4 py-2.5 bg-[#18181c] border border-white/10 hover:border-white/30 text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>View Public Blog</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-[#121215] border border-white/10 p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Office Phone</span>
              <div className="text-base font-semibold text-white">+91 9324241800</div>
              <p className="text-[11px] text-zinc-400">5th Floor, Summit Building, Gomti Nagar</p>
            </div>
            <a
              href="tel:+919324241800"
              className="p-3 bg-white/[0.04] border border-white/10 hover:border-white/40 text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-[#A6A182]" />
            </a>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Quick Table */}
      <div className="bg-[#121215] border border-white/10 p-6 sm:p-7">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div>
            <h2 className="font-sans text-lg font-semibold text-white">Recent Client Inquiries</h2>
            <p className="text-xs text-zinc-400 mt-0.5 font-light">Latest consultations submitted through website</p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-mono uppercase tracking-wider text-[#A6A182] hover:text-white transition-colors flex items-center gap-1"
          >
            <span>View All ({total})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="py-12 text-center text-zinc-500 text-sm font-light">
            No inquiries recorded yet. Submissions from the consultation booking form will appear here in real-time.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 font-mono uppercase tracking-wider text-zinc-400">
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Service Tier</th>
                  <th className="py-3 px-4">Location / Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-light">
                {inquiries.slice(0, 5).map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-medium text-white">{inquiry.full_name}</td>
                    <td className="py-3.5 px-4">
                      <a href={`tel:${inquiry.phone}`} className="text-[#A6A182] hover:underline">
                        {inquiry.phone}
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300">{inquiry.service}</td>
                    <td className="py-3.5 px-4 text-zinc-400">{inquiry.city || '—'}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${
                          inquiry.status === 'New'
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                            : inquiry.status === 'In Progress'
                            ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                            : 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-zinc-400 font-mono">
                      {new Date(inquiry.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
