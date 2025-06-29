import { useRouter } from 'next/router';

export default function LiveNowStrip({ streams = [] }) {
  const router = useRouter();

  const demoLive = streams.length
    ? streams
    : [
        { username: 'Prince Dike', avatar: '/avatars/p1.jpg' },
        { username: 'Jane Doe', avatar: '/avatars/queen.jpg' },
        { username: 'Coach OnAir', avatar: '/avatars/coach.png' }
      ];

  return (
    <div className="mb-4">
      <h2 className="text-sm font-bold text-gray-800 dark:text-white mb-2">🔴 Live Now</h2>
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {demoLive.map((user, i) => (
          <div
            key={i}
            onClick={() => router.push('/live/' + user.username.toLowerCase().replace(/\s+/g, ''))}
            className="flex flex-col items-center cursor-pointer w-24"
          >
            <div className="relative w-20 h-20 overflow-hidden border-2 border-red-500 rounded-md">
              <img src={user.avatar} alt={user.username} className="object-cover w-full h-full" />
              <span className="absolute bottom-0 right-0 bg-red-600 text-white text-[10px] px-1 rounded">LIVE</span>
            </div>
            <p className="text-xs mt-1 text-center text-gray-700 dark:text-gray-200 truncate w-full">
              {user.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}