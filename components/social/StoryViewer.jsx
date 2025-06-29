import { useEffect, useState } from 'react';

export default function StoryViewer({ stories, onClose }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < stories.length - 1) {
        setIndex(prev => prev + 1);
      } else {
        onClose();
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [index, stories.length, onClose]);

  if (!stories || stories.length === 0) return null;

  const story = stories[index];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="relative w-full max-w-sm p-6 bg-white dark:bg-gray-900 rounded-xl shadow-xl text-center text-black dark:text-white">
        <button onClick={onClose} className="absolute top-2 right-2 text-white text-xl font-bold">✕</button>
        {story.image && (
          <img
            src={story.image}
            alt="Story"
            className="rounded-lg w-full max-h-96 object-cover mb-4"
          />
        )}
        {story.text && (
          <p className="text-sm mb-2">{story.text}</p>
        )}
        <p className="text-xs text-gray-500">@{story.username}</p>
      </div>
    </div>
  );
}