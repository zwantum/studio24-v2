'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('amandangi950@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-white/[0.03] blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-[#121215] border border-white/10 p-8 sm:p-10 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="relative h-9 w-36 mx-auto">
              <Image
                src="/Studio24_Logo.webp"
                alt="Studio24 by Shreya"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#A6A182] font-semibold">
              Atelier Command Center
            </span>
          </div>
          <h1 className="font-sans text-2xl font-semibold tracking-tight text-white">Admin Authentication</h1>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            Authorized Studio24 concierge & administrative staff only
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/40 border border-red-500/30 text-red-200 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#18181b] border border-white/10 focus:border-[#A6A182] py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none transition-colors"
                placeholder="admin@studio24.com"
              />
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-300">
              Passcode / Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#18181b] border border-white/10 focus:border-[#A6A182] py-2.5 pl-10 pr-3 text-sm text-white focus:outline-none transition-colors"
                placeholder="••••••••••••"
              />
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.12)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <span>Authenticating...</span>
                <Loader2 className="w-4 h-4 animate-spin" />
              </>
            ) : (
              <>
                <span>Enter Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <span>&larr; Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
