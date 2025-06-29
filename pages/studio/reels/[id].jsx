
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HeartIcon, ShareIcon } from '@heroicons/react/24/solid';

export default function ReelsViewer() {
  const router = useRouter();
  const { id } = router.query;
  const [reel, setReel] = useState(null);

  useEffect(() => {
    if (id) {
      setReel({
        id,
        videoUrl: '/demo/sample-reel.mp4',
        caption: '🔥 Vibes only! Drop a ❤️ & share 🎉',
        user: {
          username: 'prince',
          avatar: '/avatar.jpg',
        },
      });
    }
  }, [id]);

  if (!reel) return <div className="text-center p-10 text-gray-400">Loading Reel...</div>;

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-4">
      <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-2xl">
        <video
          src={reel.videoUrl}
          controls
          autoPlay
          loop
          className="w-full h-[500px] object-cover rounded-xl"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <img src={reel.user.avatar} className="w-10 h-10 rounded-full border-2 border-white" alt="User Avatar" />
          <span className="text-white font-semibold">@{reel.user.username}</span>
        </div>
      </div>
      <p className="mt-4 text-center text-lg font-light italic text-purple-300">{reel.caption}</p>
      <div className="mt-6 flex items-center gap-6">
        <button className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
          <HeartIcon className="h-5 w-5" /> Like
        </button>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
          <ShareIcon className="h-5 w-5" /> Share
        </button>
      </div>
    </div>
  );
}
