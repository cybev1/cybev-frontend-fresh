import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ReelsFeed() {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    fetch('/api/reels')
      .then(res => res.json())
      .then(data => setReels(data))
      .catch(() => {
        setReels([
          {
            id: 'demo1',
            videoUrl: '/demo/sample-reel.mp4',
            user: { username: 'cybev', avatar: '/avatar.jpg' },
            caption: 'Watch this cool demo reel 🎥',
          },
          {
            id: 'demo2',
            videoUrl: '/demo/sample2.mp4',
            user: { username: 'prince', avatar: '/avatar.jpg' },
            caption: 'Another amazing reel ✨',
          },
        ]);
      });
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">🎬 Trending Reels</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reels.map(reel => (
          <Link key={reel.id} href={`/reels/view/${reel.id}`}>
            <div className="bg-black rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition">
              <video src={reel.videoUrl} className="w-full h-64 object-cover" muted loop playsInline />
              <div className="p-3 text-white">
                <div className="font-medium">@{reel.user.username}</div>
                <div className="text-sm text-gray-300">{reel.caption}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}