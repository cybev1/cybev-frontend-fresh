import { useEffect, useState } from 'react';
import BlogPreviewCard from '@/components/BlogPreviewCard';

export default function StudioBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog/mine')
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error('Error loading blogs:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
      {loading ? (
        <p>Loading blogs...</p>
      ) : blogs.length ? (
        <div className="grid gap-4">
          {blogs.map((blog, idx) => (
            <BlogPreviewCard
              key={idx}
              title={blog?.title}
              description={blog?.description}
              author={blog?.author || 'You'}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No blogs found. Create your first blog post!</p>
      )}
    </div>
  );
}
