import { useState, useEffect } from 'react';

export default function RecommendedContent() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch('/api/posts/visibility')
      .then((res) => res.json())
      .then((data) => setRecommendations(data.recommendations))
      .catch(() => setRecommendations([]));
  }, []);

  if (!recommendations.length) return <div>Loading recommendations...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Recommended Content</h2>
      <div className="space-y-4">
        {recommendations.map((post) => (
          <div key={post._id} className="p-4 bg-gray-200 rounded-lg">
            <h3 className="font-semibold">{post.title}</h3>
            <p>Views: {post.views}</p>
            <p>Shares: {post.shares}</p>
            <p>Reactions: {post.reactions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
