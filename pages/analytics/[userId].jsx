import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsDashboard() {
  const router = useRouter();
  const { userId } = router.query;
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`/api/analytics/${userId}`)
        .then((res) => res.json())
        .then((data) => setAnalytics(data.analytics))
        .catch(() => setAnalytics({ views: 0, reactions: 0, earnings: 0 }));
    }
  }, [userId]);

  if (!analytics) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Analytics Dashboard</h2>
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
          <h3 className="font-semibold">Earnings</h3>
          <p>{analytics.earnings} CYBV</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-6">Content Performance Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analytics.chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#8884d8" />
            <Line type="monotone" dataKey="reactions" stroke="#82ca9d" />
            <Line type="monotone" dataKey="earnings" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
