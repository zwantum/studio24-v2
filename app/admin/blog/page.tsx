'use client';

import React, { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
import { blogClient } from '@/lib/blogClient';
import '@/styles/zwantum-blog.css';

function LoadingView({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center text-slate-500">
      <RefreshCw className="w-7 h-7 animate-spin text-[#A6A182] mb-3" />
      <p className="text-xs font-mono uppercase tracking-wider">{label}</p>
    </div>
  );
}

// Dynamically import views to keep SSR optimal
const BlogOverview = dynamic(
  () => import('@zwantum/blog/admin').then((m) => m.BlogOverview),
  { ssr: false, loading: () => <LoadingView label="Loading Blog Overview..." /> }
);
const PostList = dynamic(
  () => import('@zwantum/blog/admin').then((m) => m.PostList),
  { ssr: false, loading: () => <LoadingView label="Loading Articles Directory..." /> }
);
const PostEditor = dynamic(
  () => import('@zwantum/blog/admin').then((m) => m.PostEditor),
  { ssr: false, loading: () => <LoadingView label="Loading Post Editor..." /> }
);
const CategoryManager = dynamic(
  () => import('@zwantum/blog/admin').then((m) => m.CategoryManager),
  { ssr: false, loading: () => <LoadingView label="Loading Categories..." /> }
);
const AuthorManager = dynamic(
  () => import('@zwantum/blog/admin').then((m) => m.AuthorManager),
  { ssr: false, loading: () => <LoadingView label="Loading Authors..." /> }
);
const MediaLibrary = dynamic(
  () => import('@zwantum/blog/admin').then((m) => m.MediaLibrary),
  { ssr: false, loading: () => <LoadingView label="Loading Media Library..." /> }
);
const BlogSettingsView = dynamic(
  () => import('@zwantum/blog/admin').then((m) => m.BlogSettingsView),
  { ssr: false, loading: () => <LoadingView label="Loading Settings..." /> }
);
const ToastContainer = dynamic(
  () => import('@zwantum/blog/admin').then((m) => m.ToastContainer),
  { ssr: false }
);

function BlogModuleWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams.get('view') || 'overview';
  const postId = searchParams.get('id') || undefined;

  const [showMediaPickerModal, setShowMediaPickerModal] = useState(false);
  const [mediaPickerSelectCallback, setMediaPickerSelectCallback] = useState<((media: any) => void) | null>(null);

  return (
    <div className="w-full bg-white text-slate-900 rounded-none p-6 sm:p-8 shadow-xl border border-slate-200/80 min-h-[calc(100vh-120px)] animate-in fade-in-50 duration-200">
      {/* View 1: Overview */}
      {currentView === 'overview' && (
        <BlogOverview
          client={blogClient}
          onNavigateToPosts={() => router.push('/admin/blog?view=posts')}
          onNavigateToNewPost={() => router.push('/admin/blog?view=new-post')}
          onNavigateToEditPost={(id: string) => router.push(`/admin/blog?view=edit-post&id=${id}`)}
        />
      )}

      {/* View 2: All Posts */}
      {currentView === 'posts' && (
        <PostList
          client={blogClient}
          onNavigateToNewPost={() => router.push('/admin/blog?view=new-post')}
          onNavigateToEditPost={(id: string) => router.push(`/admin/blog?view=edit-post&id=${id}`)}
        />
      )}

      {/* View 3: Add New Post */}
      {currentView === 'new-post' && (
        <PostEditor
          key="new-post"
          client={blogClient}
          onBack={() => router.push('/admin/blog?view=posts')}
          onSaveSuccess={(savedPost: any) => {
            router.push(`/admin/blog?view=edit-post&id=${savedPost.id}`);
          }}
          onOpenMediaLibrary={(onSelect: (media: any) => void) => {
            setMediaPickerSelectCallback(() => onSelect);
            setShowMediaPickerModal(true);
          }}
        />
      )}

      {/* View 4: Edit Post */}
      {currentView === 'edit-post' && (
        <PostEditor
          key={`edit-post-${postId}`}
          client={blogClient}
          postId={postId}
          onBack={() => router.push('/admin/blog?view=posts')}
          onSaveSuccess={(savedPost: any) => {
            router.push(`/admin/blog?view=edit-post&id=${savedPost.id}`);
          }}
          onOpenMediaLibrary={(onSelect: (media: any) => void) => {
            setMediaPickerSelectCallback(() => onSelect);
            setShowMediaPickerModal(true);
          }}
        />
      )}

      {/* View 5: Categories */}
      {currentView === 'categories' && <CategoryManager client={blogClient} />}

      {/* View 6: Authors */}
      {currentView === 'authors' && <AuthorManager client={blogClient} />}

      {/* View 7: Media Library */}
      {currentView === 'media' && <MediaLibrary client={blogClient} />}

      {/* View 8: Blog Settings */}
      {currentView === 'settings' && <BlogSettingsView client={blogClient} />}

      {/* Media Picker Modal */}
      {showMediaPickerModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowMediaPickerModal(false);
          }}
        >
          <div className="bg-white rounded-none w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-base">Media Library</h3>
                <p className="text-xs text-slate-500">Select an existing image or upload a new one</p>
              </div>
              <button
                type="button"
                onClick={() => setShowMediaPickerModal(false)}
                className="w-8 h-8 rounded-none border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <MediaLibrary
                client={blogClient}
                onSelectMedia={(media: any) => {
                  mediaPickerSelectCallback?.(media);
                  setShowMediaPickerModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default function AdminBlogPage() {
  return (
    <Suspense fallback={<LoadingView label="Loading Blog Module..." />}>
      <BlogModuleWorkspace />
    </Suspense>
  );
}
