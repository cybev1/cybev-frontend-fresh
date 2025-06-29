
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function CommentSection({ reelId, username }) {
  const { data, mutate } = useSWR(reelId ? `/api/reels/comment?reelId=${reelId}` : null, fetcher);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const postComment = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await axios.post('/api/reels/comment', { reelId, username, text });
    setText('');
    mutate(); // refresh comments
    setLoading(false);
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-md font-semibold text-gray-800 dark:text-white">Comments</h3>

      <div className="flex gap-2 items-center">
        <input
          type="text"
          className="flex-1 text-sm p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={postComment}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
        >
          {loading ? '...' : 'Post'}
        </button>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {data?.comments?.map((comment) => (
          <div key={comment._id} className="p-2 rounded bg-gray-100 dark:bg-zinc-800">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">@{comment.username}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{comment.text}</div>
            <div className="text-[10px] text-gray-400 dark:text-gray-500">{new Date(comment.createdAt).toLocaleString()}</div>
          </div>
        ))}
        {data?.comments?.length === 0 && (
          <p className="text-xs text-gray-400">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
