
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ReelsFeed() {
  const { data, error } = useSWR('/api/reels/list', fetcher);

  if (error) return <div className="text-center text-red-500">Failed to load reels</div>;
  if (!data) return <div className="text-center text-gray-400">Loading reels...</div>;

  return (
    <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-md mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">📺 Latest Reels</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {data.reels.map((reel) => (
          <Link href={`/reels/${reel._id}`} key={reel._id}>
            <div className="aspect-[9/16] bg-zinc-700 rounded-lg overflow-hidden">
              <video
                src={reel.videoUrl}
                muted
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
