import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ActivityFeed() {
  const router = useRouter();
  const { userId } = router.query;
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`/api/notifications/${userId}`)
        .then((res) => res.json())
        .then((data) => setActivities(data.activities))
        .catch(() => setActivities([]));
    }
  }, [userId]);

  if (!activities.length) return <div>No activities available.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Activity Feed</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity._id} className="p-4 bg-gray-200 rounded-lg">
            <p>{activity.description}</p>
            <small>{new Date(activity.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
