import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch('/api/blog/' + id)
      .then(res => res.json())
      .then(data => {
        setBlog(data.blog || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading blog:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!blog) return <p className="p-6 text-red-500">Blog not found.</p>;

  return (
    <div className="min-h-screen p-6 bg-white text-black">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{blog?.title || "Untitled"}</h1>
        <div className="text-sm text-gray-500 mb-4">
          {blog?.createdAt ? new Date(blog.createdAt).toLocaleString() : "Unknown date"}
        </div>
        <p className="text-lg text-gray-800 whitespace-pre-wrap">
          {blog?.description || "No content available."}
        </p>
      </div>
    </div>
  );
}
