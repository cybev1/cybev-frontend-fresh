
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PlayIcon, Volume2Icon, Share2Icon } from 'lucide-react';

export default function ReelsViewer() {
  const router = useRouter();
  const { id } = router.query;
  const [reel, setReel] = useState(null);

  useEffect(() => {
    if (id) {
      setReel({
        id,
        videoUrl: '/demo/sample-reel.mp4',
        caption: '🔥 Unleash the vibe! #GenZReel',
        user: {
          username: 'prince',
          avatar: '/avatar.jpg',
        },
      });
    }
  }, [id]);

  if (!reel) return <div className="text-center p-10 text-gray-400">Loading Reel...</div>;

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black text-white px-4 py-8">
      <video
        src={reel.videoUrl}
        controls
        autoPlay
        loop
        className="rounded-xl shadow-2xl max-h-[80vh] w-full sm:w-[400px] mb-4 border-4 border-pink-500/20"
      />
      <div className="text-center space-y-2 animate-fadeIn">
        <div className="text-lg font-bold">@{reel.user.username}</div>
        <p className="text-sm text-gray-300 italic">{reel.caption}</p>
        <div className="flex justify-center space-x-6 mt-2 text-pink-400">
          <PlayIcon className="w-5 h-5 hover:text-white cursor-pointer" />
          <Volume2Icon className="w-5 h-5 hover:text-white cursor-pointer" />
          <Share2Icon className="w-5 h-5 hover:text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
