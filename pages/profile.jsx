import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch(`/api/users/profile`);
      const data = await response.json();
      if (data.success) {
        setUser(data.user);
        setBio(data.user.bio || '');
        setProfilePic(data.user.profilePic || '/default-avatar.png');
        setPosts(data.user.posts || []);
      } else {
        router.push('/login');
      }
    };
    fetchUserProfile();
  }, [router]);

  const handleUpdateProfile = async () => {
    const updatedUser = { bio, profilePic };
    const response = await fetch('/api/users/updateProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    });
    const data = await response.json();
    if (data.success) {
      alert('Profile updated successfully');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="flex items-center mb-6">
        <img src={profilePic} alt="Profile" className="w-32 h-32 rounded-full mr-4" />
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2"
        />
      </div>

      <div className="mt-4">
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Your Bio"
          className="w-full p-4 border rounded-md"
        />
      </div>

      <button onClick={handleUpdateProfile} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">
        Update Profile
      </button>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
        <div>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="mb-4">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p>{post.content}</p>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
