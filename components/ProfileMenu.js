import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Link from 'next/link';

const ProfileMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="text-white font-medium hover:underline focus:outline-none"
      >
        {user.username || user.email}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
            Signed in as <b>{user.username}</b>
          </div>
          <Link href="/studio/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;