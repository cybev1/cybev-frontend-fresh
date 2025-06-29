import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UserProfile() {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (userId) {
      fetch(`/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user);
          setBio(data.user.bio);
          setAvatar(data.user.avatar);
        })
        .catch(() => setUser(null));
    }
  }, [userId]);

  const handleProfileUpdate = async () => {
    await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio, avatar }),
    });

    alert('Profile updated!');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">User Profile</h2>
      <div className="mb-6">
        <img src={avatar || '/default-avatar.png'} alt="Avatar" className="w-24 h-24 rounded-full" />
        <input
          type="file"
          onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
          className="mt-2"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="bio" className="block text-xl font-semibold">Bio</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full p-2 mt-2 border rounded-lg"
          placeholder="Enter your bio"
        />
      </div>
      <button onClick={handleProfileUpdate} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
        Update Profile
      </button>

      <h3 className="mt-6 text-xl font-semibold">Social Engagement</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">Posts</h3>
          <p>{user.engagement.posts}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">Reactions</h3>
          <p>{user.engagement.reactions}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">Shares</h3>
          <p>{user.engagement.shares}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">Followers</h3>
          <p>{user.engagement.followers}</p>
        </div>
      </div>
    </div>
  );
}
