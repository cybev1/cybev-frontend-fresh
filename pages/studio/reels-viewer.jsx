
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ReelsViewer() {
  const router = useRouter();
  const { id } = router.query;
  const [reel, setReel] = useState(null);

  useEffect(() => {
    if (id) {
      // Simulated fetch
      setReel({
        id,
        videoUrl: '/demo/sample-reel.mp4',
        caption: 'Enjoy this epic reel on CYBEV 🎬',
        user: {
          username: 'prince',
          avatar: '/avatar.jpg',
        },
        comments: [
          { user: 'faith', text: 'Awesome reel!' },
          { user: 'david', text: '🔥🔥🔥' },
        ],
      });
    }
  }, [id]);

  if (!reel) return <div className="text-center p-10 text-gray-400">Loading Reel...</div>;

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black text-white px-4">
      <video
        src={reel.videoUrl}
        controls
        autoPlay
        loop
        className="max-h-[80vh] w-full sm:w-[360px] rounded-lg shadow-lg"
      />
      <div className="mt-4 text-center">
        <div className="text-lg font-semibold">@{reel.user.username}</div>
        <p className="text-sm text-gray-300">{reel.caption}</p>
      </div>
      <div className="mt-6 w-full sm:w-[360px]">
        <h3 className="text-md font-semibold mb-2">Comments</h3>
        <div className="space-y-2">
          {reel.comments.map((comment, idx) => (
            <div key={idx} className="bg-gray-800 p-2 rounded-md">
              <strong>@{comment.user}</strong>: {comment.text}
            </div>
          ))}
        </div>
        <Link href="/studio/reels">
          <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
            Back to Reels
          </button>
        </Link>
      </div>
    </div>
  );
}
