import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PostVisibility() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);
  const [visibility, setVisibility] = useState('public');

  useEffect(() => {
    if (postId) {
      fetch(`/api/posts/visibility/${postId}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data.post);
          setVisibility(data.post.visibility);
        });
    }
  }, [postId]);

  const handleVisibilityChange = async () => {
    await fetch(`/api/posts/visibility/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visibility }),
    });

    alert('Post visibility updated!');
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Post Visibility</h2>
      <p>Current visibility: {post.visibility}</p>
      <div className="mb-6">
        <label htmlFor="visibility" className="block text-xl font-semibold">Change Visibility</label>
        <select
          id="visibility"
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="p-2 mt-2 border rounded-lg"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
      <button onClick={handleVisibilityChange} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
        Update Visibility
      </button>
    </div>
  );
}
