import { useState } from 'react';
import PostEditor from '../../components/PostEditor';

export default function CreatePost() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      <PostEditor />
    </div>
  );
}