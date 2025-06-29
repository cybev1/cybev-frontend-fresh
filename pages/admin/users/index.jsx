import { useState, useEffect } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      });
  }, []);

  const handleAction = async (userId, action, role) => {
    await fetch(`/api/admin/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, role }),
    });

    setUsers((prev) =>
      prev.map((user) => (user._id === userId ? { ...user, banned: action === 'ban', role } : user))
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Admin User Management</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user._id} className="p-4 bg-gray-200 rounded-lg">
            <h3 className="font-semibold">{user.username}</h3>
            <p>Role: {user.role}</p>
            <p>Status: {user.banned ? 'Banned' : 'Active'}</p>
            <button
              onClick={() => handleAction(user._id, user.banned ? 'unban' : 'ban')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              {user.banned ? 'Unban' : 'Ban'}
            </button>
            <button
              onClick={() => handleAction(user._id, 'assign', 'admin')}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Assign Admin Role
            </button>
            <button
              onClick={() => handleAction(user._id, 'assign', 'user')}
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Assign User Role
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
