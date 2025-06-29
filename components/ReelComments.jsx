// components/ReelComments.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReelComments({ reelId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    async function fetchComments() {
      const res = await axios.get('/api/reels/comments', { params: { id: reelId } });
      setComments(res.data);
    }
    fetchComments();
  }, [reelId]);

  async function submitComment() {
    if (!text.trim()) return;
    await axios.post('/api/reels/comments', {
      reelId,
      username: 'DemoUser',
      comment: text.trim(),
    });
    setText('');
    const res = await axios.get('/api/reels/comments', { params: { id: reelId } });
    setComments(res.data);
  }

  return (
    <div className="mt-4 w-full max-w-md">
      <div className="mb-2 text-white font-bold">Comments</div>
      <div className="space-y-2 max-h-60 overflow-y-auto bg-white bg-opacity-5 p-2 rounded">
        {comments.map((c, i) => (
          <div key={i} className="text-sm text-gray-200">
            <span className="font-medium">@{c.username}:</span> {c.comment}
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-2 rounded-l bg-white bg-opacity-10 text-white text-sm"
        />
        <button onClick={submitComment} className="px-4 py-2 bg-cyan-600 text-white text-sm rounded-r">
          Post
        </button>
      </div>
    </div>
  );
}