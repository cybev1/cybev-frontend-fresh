import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PostAnalytics() {
  const router = useRouter();
  const { postId } = router.query;
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (postId) {
      fetch(`/api/posts/analytics/${postId}`)
        .then((res) => res.json())
        .then((data) => setAnalytics(data.analytics))
        .catch(() => setAnalytics({ views: 0, reactions: 0, shares: 0, earnings: 0 }));
    }
  }, [postId]);

  if (!analytics) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Post Analytics</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">Views</h3>
          <p>{analytics.views}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">Reactions</h3>
          <p>{analytics.reactions}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">Shares</h3>
          <p>{analytics.shares}</p>
        </div>
      </div>

      <div className="p-4 bg-gray-200 rounded-lg">
        <h3 className="font-semibold">Earnings</h3>
        <p>${analytics.earnings.toFixed(2)}</p>
      </div>
    </div>
  );
}
