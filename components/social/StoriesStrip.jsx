import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function StoriesStrip() {
  const [stories, setStories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/stories')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.stories)) {
          setStories(data.stories);
        }
      });
  }, []);

  return (
    <div className="flex space-x-4 overflow-x-auto py-4 mb-4">
      <div className="flex flex-col items-center text-xs min-w-[60px] cursor-pointer" onClick={() => router.push('/studio/stories')}>
        <div className="w-14 h-14 rounded-full border-2 border-dashed border-blue-500 p-1 overflow-hidden">
          <div className="rounded-full w-full h-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-blue-600">+</div>
        </div>
        <p className="text-center mt-1">You</p>
      </div>

      {stories.map((story, i) => (
        <div
          key={i}
          onClick={() => router.push('/stories/' + story.username)}
          className="flex flex-col items-center text-xs min-w-[60px] cursor-pointer"
        >
          <div className="w-14 h-14 rounded-full border-2 border-blue-500 p-1 overflow-hidden">
            <img
              src={story.mediaURL || '/default-avatar.png'}
              alt={story.username}
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <p className="text-center mt-1 truncate w-full">{story.username}</p>
        </div>
      ))}
    </div>
  );
}