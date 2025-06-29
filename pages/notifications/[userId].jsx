import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Notifications() {
  const router = useRouter();
  const { userId } = router.query;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (userId) {
      fetch(`/api/notifications/${userId}`)
        .then((res) => res.json())
        .then((data) => setNotifications(data.notifications))
        .catch(() => setNotifications([]));
    }
  }, [userId]);

  if (!notifications.length) return <div>No notifications available.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification._id} className="p-4 bg-gray-200 rounded-lg">
            <p>{notification.message}</p>
            <small>{new Date(notification.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
