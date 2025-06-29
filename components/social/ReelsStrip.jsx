import { useRouter } from 'next/router';
import { PlayIcon } from '@heroicons/react/24/solid';

export default function ReelsStrip() {
  const router = useRouter();
  const demoReels = [
    { id: 1, thumbnail: '/reels/1.jpg', caption: 'How to Mint NFTs' },
    { id: 2, thumbnail: '/reels/2.jpg', caption: 'Social Token Tips' },
    { id: 3, thumbnail: '/reels/3.jpg', caption: 'Top 5 Web3 Tools' },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-sm font-bold text-gray-800 dark:text-white mb-2">🎞 Featured Reels</h2>
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {demoReels.map(reel => (
          <div
            key={reel.id}
            onClick={() => router.push('/reels/' + reel.id)}
            className="relative w-40 h-64 rounded-lg overflow-hidden cursor-pointer shadow"
          >
            <img src={reel.thumbnail} alt={reel.caption} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <PlayIcon className="w-10 h-10 text-white opacity-90" />
            </div>
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-xs p-1 truncate text-center">
              {reel.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}