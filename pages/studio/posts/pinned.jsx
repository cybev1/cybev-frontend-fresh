import { useState, useEffect } from 'react';

export default function PostFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts/pin')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.pinnedPosts);
      });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pinned Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
