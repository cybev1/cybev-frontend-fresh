import React, { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import axios from 'axios';

const fetcher = url => axios.get(url).then(res => res.data);

export default function ReelsInfiniteScroll() {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `/api/explore/reels?page=${index + 1}`,
    fetcher
  );

  const reels = data ? [].concat(...data) : [];

  const loadMore = async () => {
    setIsLoadingMore(true);
    await setSize(size + 1);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 300 >=
        document.documentElement.scrollHeight
      ) {
        if (!isLoadingMore) {
          loadMore();
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoadingMore]);

  if (error) return <div>Error loading reels</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {reels.map((reel) => (
        <div key={reel._id} className="rounded overflow-hidden shadow-lg">
          <video src={reel.videoUrl} controls className="w-full h-60 object-cover" />
          <div className="px-2 py-1 text-sm">{reel.caption}</div>
        </div>
      ))}
      {isLoadingMore && <p className="text-center col-span-full">Loading more reels...</p>}
    </div>
  );
}