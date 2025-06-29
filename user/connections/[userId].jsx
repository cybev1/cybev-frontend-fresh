import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UserConnections() {
  const router = useRouter();
  const { userId } = router.query;
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetch(`/api/user/connections/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setFollowers(data.followers);
          setFollowing(data.following);
          setLoading(false);
        });
    }
  }, [userId]);

  const handleFollowUnfollow = async (targetUserId, action) => {
    await fetch(`/api/user/connections/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, targetUserId }),
    });

    if (action === 'follow') {
      setFollowing((prev) => [...prev, targetUserId]);
    } else {
      setFollowing((prev) => prev.filter((id) => id !== targetUserId));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">User Connections</h2>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Followers</h3>
        <ul>
          {followers.map((follower) => (
            <li key={follower}>
              <span>User {follower}</span>
              <button
                onClick={() => handleFollowUnfollow(follower, 'unfollow')}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Unfollow
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Following</h3>
        <ul>
          {following.map((followedUser) => (
            <li key={followedUser}>
              <span>User {followedUser}</span>
              <button
                onClick={() => handleFollowUnfollow(followedUser, 'unfollow')}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Unfollow
              </button>
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mt-6">Users to Follow</h3>
        <ul>
          {/* Placeholder: List of users to follow can be fetched dynamically */}
          {['user1', 'user2', 'user3'].map((user) => (
            <li key={user}>
              <span>User {user}</span>
              <button
                onClick={() => handleFollowUnfollow(user, 'follow')}
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Follow
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
