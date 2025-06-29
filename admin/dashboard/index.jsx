import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAction = async (id, action) => {
    await fetch(`/api/admin/posts/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action }),
    });

    setPosts((prev) =>
      prev.map((post) => (post._id === id ? { ...post, status: action } : post))
    );
  };

  const handleDelete = async (id) => {
    await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
    setPosts((prev) => prev.filter((post) => post._id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="p-4 bg-gray-200 rounded-lg">
            <h3 className="font-semibold">{post.title}</h3>
            <p>{post.content}</p>
            <p>Status: {post.status}</p>
            <button
              onClick={() => handleAction(post._id, 'approve')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Approve
            </button>
            <button
              onClick={() => handleAction(post._id, 'reject')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Reject
            </button>
            <button
              onClick={() => handleDelete(post._id)}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
