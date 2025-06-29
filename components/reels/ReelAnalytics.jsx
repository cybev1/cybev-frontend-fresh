
import useSWR from 'swr';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ReelAnalytics({ reelId }) {
  const { data, error } = useSWR(reelId ? \`/api/reels/engage?reelId=\${reelId}\` : null, fetcher);

  if (error) return <p className="text-red-500 text-sm">Failed to load analytics</p>;
  if (!data) return <p className="text-gray-400 text-sm">Loading analytics...</p>;

  const chartData = [
    { name: 'Likes', value: data.likes || 0 },
    { name: 'Boosts', value: data.boosts || 0 }
  ];

  return (
    <div className="mt-6">
      <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-2">📊 Reel Analytics</h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={chartData} layout="vertical">
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Bar dataKey="value" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tracking likes and boosts live</div>
    </div>
  );
}
