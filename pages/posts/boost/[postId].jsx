import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PostBoost() {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);
  const [boostAmount, setBoostAmount] = useState(0);
  const [performance, setPerformance] = useState(null);

  useEffect(() => {
    if (postId) {
      fetch(`/api/posts/boost/${postId}`)
        .then((res) => res.json())
        .then((data) => setPerformance(data.analytics))
        .catch(() => setPerformance({ shares: 0, reactions: 0, comments: 0 }));
    }
  }, [postId]);

  const handleBoost = async () => {
    await fetch(`/api/posts/boost/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ boostAmount }),
    });

    alert('Post boosted successfully!');
  };

  if (!performance) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Post Boosting</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">Shares</h3>
          <p>{performance.shares}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">Reactions</h3>
          <p>{performance.reactions}</p>
        </div>
        <div className="p-4 bg-gray-200 rounded-lg">
          <h3 className="font-semibold">Comments</h3>
          <p>{performance.comments}</p>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="boostAmount" className="block text-xl font-semibold">
          Boost Amount (CYBV)
        </label>
        <input
          type="number"
          id="boostAmount"
          value={boostAmount}
          onChange={(e) => setBoostAmount(e.target.value)}
          className="p-2 mt-2 border rounded-lg"
          placeholder="Enter amount to boost"
        />
      </div>

      <button
        onClick={handleBoost}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Boost Post
      </button>
    </div>
  );
}
