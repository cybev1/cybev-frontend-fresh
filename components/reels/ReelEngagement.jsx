
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart, Rocket } from 'lucide-react';

export default function ReelEngagement({ reelId, username }) {
  const [counts, setCounts] = useState({ likes: 0, boosts: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reelId) {
      axios.get(`/api/reels/engage?reelId=${reelId}`).then((res) => {
        setCounts(res.data);
      });
    }
  }, [reelId]);

  const handleAction = async (action) => {
    if (!reelId || !username) return;
    setLoading(true);
    await axios.post('/api/reels/engage', { reelId, username, action });
    const res = await axios.get(`/api/reels/engage?reelId=${reelId}`);
    setCounts(res.data);
    setLoading(false);
  };

  return (
    <div className="flex gap-6 items-center text-sm text-gray-700 dark:text-gray-200 mt-4">
      <button onClick={() => handleAction('like')} className="flex items-center gap-1 hover:text-red-500">
        <Heart className="w-4 h-4" /> {counts.likes}
      </button>
      <button onClick={() => handleAction('boost')} className="flex items-center gap-1 hover:text-yellow-500">
        <Rocket className="w-4 h-4" /> {counts.boosts}
      </button>
    </div>
  );
}
