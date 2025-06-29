import { useState } from 'react';
import PostEditor from '../../components/PostEditor';

export default function WritePost() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Write for Your Blog</h1>
      <PostEditor />
    </div>
  );
}