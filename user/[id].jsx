import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/user/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user);
          setUsername(data.user.username);
          setBio(data.user.bio);
          setProfilePicture(data.user.profilePicture);
        });
    }
  }, [id]);

  const handleProfileUpdate = async () => {
    await fetch(`/api/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, bio, profilePicture }),
    });

    alert('Profile updated!');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">User Profile</h2>
      <div className="flex flex-col items-center mt-4">
        <img src={user.profilePicture || '/default-avatar.png'} alt="Profile" className="w-32 h-32 rounded-full" />
        <div className="mt-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 mb-4 border rounded"
            placeholder="Username"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-2 mb-4 border rounded"
            placeholder="Bio"
          />
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            className="p-2 mb-4 border rounded"
            placeholder="Profile Picture URL"
          />
        </div>
        <button
          onClick={handleProfileUpdate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
