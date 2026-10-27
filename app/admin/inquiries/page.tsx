'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  Inbox,
  Search,
  Download,
  Filter,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  Trash2,
  Eye,
  X,
  RefreshCw,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { Inquiry, SERVICE_SECTIONS, INQUIRY_STATUSES } from '@/lib/inquiries';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('All Sections');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch inquiries from server
  const loadInquiries = async () => {
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
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  // Update Status
  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus as any } : null));
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete Inquiry
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this inquiry?')) return;
    setDeletingId(id);
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    } finally {
      setDeletingId(null);
    }
  };

  // Section-wise counting
  const sectionCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Sections': inquiries.length };
    SERVICE_SECTIONS.forEach((s) => {
      if (s !== 'All Sections') counts[s] = 0;
    });

    inquiries.forEach((item) => {
      for (const section of SERVICE_SECTIONS) {
        if (section !== 'All Sections' && item.service?.toLowerCase().includes(section.toLowerCase())) {
          counts[section] = (counts[section] || 0) + 1;
        }
      }
    });
    return counts;
  }, [inquiries]);

  // Filtered inquiries by Section, Status, and Search Query
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      // Section check
      if (
        activeSection !== 'All Sections' &&
        !item.service?.toLowerCase().includes(activeSection.toLowerCase())
      ) {
        return false;
      }

      // Status check
      if (statusFilter !== 'All' && item.status !== statusFilter) {
        return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.full_name?.toLowerCase().includes(q);
        const matchesPhone = item.phone?.toLowerCase().includes(q);
        const matchesCity = item.city?.toLowerCase().includes(q);
        const matchesDetails = item.project_details?.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesCity && !matchesDetails) {
          return false;
        }
      }

      return true;
    });
  }, [inquiries, activeSection, statusFilter, searchQuery]);

  // Export to CSV Function
  const exportToCSV = () => {
    if (filteredInquiries.length === 0) return;

    const headers = ['ID', 'Full Name', 'Phone', 'Email', 'Service Section', 'Location / Budget', 'Project Details', 'Status', 'Date'];
    const rows = filteredInquiries.map((i) => [
      i.id,
      `"${i.full_name?.replace(/"/g, '""') || ''}"`,
      `"${i.phone || ''}"`,
      `"${i.email || ''}"`,
      `"${i.service?.replace(/"/g, '""') || ''}"`,
      `"${i.city?.replace(/"/g, '""') || ''}"`,
      `"${i.project_details?.replace(/"/g, '""') || ''}"`,
      `"${i.status}"`,
      `"${new Date(i.created_at).toISOString()}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    const sectionSlug = activeSection.toLowerCase().replace(/[^a-z0-9]/g, '_');
    link.setAttribute('download', `studio24_leads_${sectionSlug}_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Form Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-light">
            Consultation inquiries organized by service section.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={loadInquiries}
            disabled={loading}
            className="px-3.5 py-2.5 bg-[#141418] border border-white/10 hover:border-white/30 text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2 transition-colors cursor-pointer"
            title="Refresh Inquiries"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={exportToCSV}
            disabled={filteredInquiries.length === 0}
            className="px-4 py-2.5 bg-[#18181c] border border-white/10 hover:border-white/40 text-xs font-mono uppercase tracking-wider text-white flex items-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV ({filteredInquiries.length})</span>
          </button>
        </div>
      </div>

      {/* SECTION TABS (Horizontal Scrollable Tabs for Mobile & Desktop) */}
      <div className="border-b border-white/10 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max pb-2">
          {SERVICE_SECTIONS.map((section) => {
            const count = sectionCounts[section] || 0;
            const isActive = activeSection === section;
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-2 border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-white text-white font-semibold bg-white/[0.04]'
                    : 'border-transparent text-zinc-400 hover:text-white hover:border-white/30'
                }`}
              >
                <span>{section}</span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono ${
                    isActive ? 'bg-white text-black font-bold' : 'bg-[#18181c] text-zinc-400 border border-white/10'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SEARCH AND SECONDARY FILTERS BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-[#121215] border border-white/10">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, phone, city, notes..."
            className="w-full bg-[#18181b] border border-white/10 focus:border-[#A6A182] py-2 pl-9 pr-3 text-xs text-white focus:outline-none transition-colors"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
        </div>

        {/* Status Dropdown Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#18181b] border border-white/10 focus:border-[#A6A182] py-2 px-3 text-xs text-white focus:outline-none transition-colors cursor-pointer"
          >
            {INQUIRY_STATUSES.map((status) => (
              <option key={status} value={status} className="bg-[#121215]">
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* INQUIRIES LIST / TABLE */}
      {loading ? (
        <div className="py-24 text-center">
          <RefreshCw className="w-6 h-6 mx-auto animate-spin text-[#A6A182] mb-3" />
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400">Loading Section Inquiries...</p>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="py-20 text-center bg-[#121215] border border-white/10 p-8 space-y-3">
          <Inbox className="w-10 h-10 mx-auto text-zinc-500 mb-2" />
          <h3 className="font-sans text-lg font-semibold text-white">No inquiries found in this section</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto font-light leading-relaxed">
            There are currently no inquiries under <strong className="text-white">{activeSection}</strong> matching your
            filters. You can click &quot;Add Test Lead&quot; to simulate a consultation call.
          </p>
        </div>
      ) : (
        <div className="bg-[#121215] border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 font-mono uppercase tracking-wider text-zinc-400 bg-white/[0.02]">
                  <th className="py-3.5 px-4">Client / Contact</th>
                  <th className="py-3.5 px-4">Service Section</th>
                  <th className="py-3.5 px-4">Location / Budget</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Name & Phone */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-white text-sm">{inquiry.full_name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="text-[#A6A182] hover:underline flex items-center gap-1 font-mono text-[11px]"
                          title="Call Client"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{inquiry.phone}</span>
                        </a>
                        <a
                          href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300"
                          title="Open WhatsApp"
                        >
                          <MessageSquare className="w-3 h-3" />
                        </a>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 bg-[#18181c] border border-white/10 text-white font-medium text-[11px]">
                        {inquiry.service}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4 text-zinc-300">
                      <div className="truncate max-w-xs">{inquiry.city || '—'}</div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4">
                      <select
                        value={inquiry.status}
                        disabled={updatingId === inquiry.id}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                        className={`text-[10px] font-mono uppercase tracking-wider py-1 px-2 border focus:outline-none transition-colors cursor-pointer ${
                          inquiry.status === 'New'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : inquiry.status === 'In Progress'
                            ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        <option value="New" className="bg-[#121215] text-amber-300">
                          New
                        </option>
                        <option value="In Progress" className="bg-[#121215] text-blue-300">
                          In Progress
                        </option>
                        <option value="Resolved" className="bg-[#121215] text-emerald-300">
                          Resolved
                        </option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-zinc-400 font-mono text-[11px]">
                      {new Date(inquiry.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="p-1.5 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                          title="View Full Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry.id)}
                          disabled={deletingId === inquiry.id}
                          className="p-1.5 border border-white/10 hover:border-red-500/40 hover:bg-red-950/20 text-zinc-400 hover:text-red-300 transition-colors cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* INQUIRY DETAIL MODAL */}
      {selectedInquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-xl bg-[#141418] border border-white/20 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A6A182]">
                  Inquiry Coordinates
                </span>
                <h3 className="font-sans text-xl font-semibold text-white mt-0.5">{selectedInquiry.full_name}</h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 border border-white/10 text-zinc-400 hover:text-white"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Coordinates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#18181b] border border-white/5 space-y-1">
                <span className="text-zinc-400 font-mono uppercase text-[10px]">Direct Phone</span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-white font-medium">{selectedInquiry.phone}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="p-1.5 bg-white/[0.06] text-white hover:bg-white hover:text-black transition-colors"
                      title="Direct Call"
                    >
                      <Phone className="w-3 h-3" />
                    </a>
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors"
                      title="Open WhatsApp Chat"
                    >
                      <MessageSquare className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#18181b] border border-white/5 space-y-1">
                <span className="text-zinc-400 font-mono uppercase text-[10px]">Service Section</span>
                <div className="text-white font-medium">{selectedInquiry.service}</div>
              </div>

              <div className="p-3 bg-[#18181b] border border-white/5 space-y-1 sm:col-span-2">
                <span className="text-zinc-400 font-mono uppercase text-[10px]">Location &amp; Budget Vision</span>
                <div className="text-zinc-200">{selectedInquiry.city || 'Not specified'}</div>
              </div>

              {selectedInquiry.project_details && (
                <div className="p-3 bg-[#18181b] border border-white/5 space-y-1 sm:col-span-2">
                  <span className="text-zinc-400 font-mono uppercase text-[10px]">Architectural Notes &amp; Details</span>
                  <div className="text-zinc-300 leading-relaxed font-light whitespace-pre-wrap">
                    {selectedInquiry.project_details}
                  </div>
                </div>
              )}
            </div>

            {/* Status Selector Inside Modal */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-zinc-400">Update Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                  className="bg-[#18181b] border border-white/20 py-1.5 px-3 text-xs text-white focus:outline-none"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="px-4 py-2 border border-red-500/40 text-red-300 text-xs uppercase hover:bg-red-950/30 transition-colors"
                >
                  Delete Lead
                </button>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-5 py-2 bg-white text-black text-xs font-semibold uppercase hover:bg-zinc-200 transition-colors"
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
