'use client';

import React from 'react';
import { BlogContent } from '@zwantum/blog/react';

interface BlogPostReaderProps {
  content: any;
  className?: string;
}

export default function BlogPostReader({ content, className = 'zw-blog-prose' }: BlogPostReaderProps) {
  if (!content) return null;

  return (
    <div className="studio24-article-content text-[#D6D2C9]">
      <BlogContent
        content={content}
        className={className}
        enableTableOfContents={false}
        enableDropCap={false}
      />
    </div>
  );
}
