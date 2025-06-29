import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Notifications() {
  const router = useRouter();
  const { userId } = router.query;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetch(`/api/notifications/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setNotifications(data.notifications);
          setLoading(false);
        });
    }
  }, [userId]);

  const markAsRead = async () => {
    await fetch(`/api/notifications/${userId}`, { method: 'PATCH' });
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const deleteNotifications = async () => {
    await fetch(`/api/notifications/${userId}`, { method: 'DELETE' });
    setNotifications([]);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          notifications.map((notif) => (
            <div key={notif._id} className={`p-4 rounded-lg ${notif.read ? 'bg-gray-200' : 'bg-blue-200'}`}>
              <p>{notif.message}</p>
              <p>{notif.timestamp}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={markAsRead}
          className="px-6 py-2 bg-green-600 text-white rounded-lg"
        >
          Mark All as Read
        </button>
        <button
          onClick={deleteNotifications}
          className="ml-4 px-6 py-2 bg-red-600 text-white rounded-lg"
        >
          Delete All
        </button>
      </div>
    </div>
  );
}
