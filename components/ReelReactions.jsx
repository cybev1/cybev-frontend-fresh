
import { useState, useEffect } from 'react';
import { Heart, Bookmark } from 'lucide-react';

export default function ReelReactions({ reelId }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Simulate fetch for initial state
    setLiked(false);
    setSaved(false);
  }, [reelId]);

  const handleLike = () => {
    setLiked(prev => !prev);
    // TODO: Call backend to record like/unlike
  };

  const handleSave = () => {
    setSaved(prev => !prev);
    // TODO: Call backend to record save/unsave
  };

  return (
    <div className="flex gap-4 justify-center mt-4">
      <button onClick={handleLike} className={`p-2 rounded-full ${liked ? 'bg-red-600 text-white' : 'bg-white text-black'}`}>
        <Heart className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} />
      </button>
      <button onClick={handleSave} className={`p-2 rounded-full ${saved ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}>
        <Bookmark className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}
