import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ReelViewer() {
  const router = useRouter();
  const { id } = router.query;
  const [reel, setReel] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/reels/${id}`)
        .then((res) => res.json())
        .then((data) => setReel(data.reel))
        .catch(() => {
          setReel({
            videoUrl: '/demo/sample-reel.mp4',
            caption: 'Sample Reel',
            user: { username: 'demo_user', avatar: '/avatar.jpg' },
            views: 0,
            reactions: 0,
          });
        });
    }
  }, [id]);

  const handleLike = async () => {
    // Implement like functionality
  };

  if (!reel) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">{reel.caption}</h2>
      <div className="mt-4">
        <video controls autoPlay loop className="max-w-full rounded-lg">
          <source src={reel.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mt-4">
        <button onClick={handleLike} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
          👍 Like
        </button>
        <p>Views: {reel.views} | Reactions: {reel.reactions}</p>
      </div>
    </div>
  );
}
