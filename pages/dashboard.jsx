import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch('/api/users/stats');
        const data = await response.json();
        setUserStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserStats();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!userStats) return <p className="p-6 text-red-500">Unable to load stats.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-xl">
          <h2 className="text-xl font-semibold">Posts</h2>
          <p>{userStats.posts}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-xl">
          <h2 className="text-xl font-semibold">Reactions</h2>
          <p>{userStats.reactions}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 shadow rounded-xl">
          <h2 className="text-xl font-semibold">Shares</h2>
          <p>{userStats.shares}</p>
        </div>
      </div>
    </div>
  );
}
