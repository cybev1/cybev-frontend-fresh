import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PostEngagement() {
  const router = useRouter();
  const { postId } = router.query;
  const [engagement, setEngagement] = useState(null);

  useEffect(() => {
    if (postId) {
      fetch(`/api/posts/engagement/${postId}`)
        .then((res) => res.json())
        .then((data) => setEngagement(data.engagement))
        .catch(() => setEngagement({ shares: 0, reactions: 0, comments: 0 }));
    }
  }, [postId]);

  if (!engagement) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Post Engagement</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">Shares</h3>
          <p>{engagement.shares}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">Reactions</h3>
          <p>{engagement.reactions}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">Comments</h3>
          <p>{engagement.comments}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Engagement Metrics Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={engagement.chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="shares" fill="#8884d8" name="Shares" />
            <Bar dataKey="reactions" fill="#82ca9d" name="Reactions" />
            <Bar dataKey="comments" fill="#ffc658" name="Comments" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
