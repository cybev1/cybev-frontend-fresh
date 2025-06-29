import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BlogPostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/blog/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading post...</div>;

  if (!post) return <div className="p-6 text-red-500">Post not found or failed to load.</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">{post?.title || "Untitled Post"}</h1>
      <p className="text-gray-600 mb-6">{post?.description || "No description available."}</p>
      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
    </div>
  );
}
