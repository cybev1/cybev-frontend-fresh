import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BellIcon } from '@heroicons/react/24/outline';

export default function NotificationsPanel() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.notifications)) {
          setNotifications(data.notifications);
        }
      });
  }, []);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
        <BellIcon className="h-6 w-6 text-gray-800 dark:text-gray-200" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg z-50 p-4">
          <h3 className="text-sm font-semibold mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications yet.</p>
          ) : (
            <ul className="space-y-3 text-sm">
              {notifications.map((n, i) => (
                <li key={i} className="border-b pb-2 last:border-0">
                  <Link href={n.link || '#'}>
                    <div className="flex items-start space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded">
                      <img src={n.avatar || '/default-avatar.png'} alt="" className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                          <strong>{n.username}</strong> {n.message}
                        </p>
                        <p className="text-xs text-gray-400">{n.time}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}