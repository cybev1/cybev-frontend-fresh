
import { useState } from 'react';

export default function PostEditor({ blogMode }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/post/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, tags, location, seoDescription, blogMode }),
    });
    const result = await res.json();
    setLoading(false);
    if (result.success) {
      alert('Post created!');
    } else {
      alert('Error creating post.');
    }
  };

  return (
    <div className="space-y-4">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" className="w-full p-2 border" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Post Content" className="w-full h-40 p-2 border" />
      <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags" className="w-full p-2 border" />
      <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-full p-2 border" />
      <textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder="SEO Description" className="w-full p-2 border" />
      <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
        {loading ? 'Publishing...' : 'Publish Post'}
      </button>
    </div>
  );
}
