import React, { useState, useEffect } from 'react';

export default function PostCard({ post }) {
  const [isPinned, setIsPinned] = useState(false);
  const [reactions, setReactions] = useState({
    like: 2,
    love: 1,
    laugh: 0,
    wow: 0,
  });

  useEffect(() => {
    const pinned = localStorage.getItem('cybev_pinned_post');
    if (String(post.id) === pinned) setIsPinned(true);
  }, [post.id]);

  const togglePin = () => {
    if (isPinned) {
      localStorage.removeItem('cybev_pinned_post');
      setIsPinned(false);
    } else {
      localStorage.setItem('cybev_pinned_post', String(post.id));
      setIsPinned(true);
    }
    window.location.reload();
  };

  const handleReact = (type) => {
    setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
  };

  return (
    <div className={`border rounded-xl p-4 mb-4 shadow bg-white dark:bg-gray-800 relative ${isPinned ? 'border-blue-600' : ''}`}>
      {isPinned && (
        <div className="absolute top-0 right-0 px-2 py-1 bg-blue-600 text-white text-xs rounded-bl-lg">📌 Pinned</div>
      )}

      <div className="flex items-center mb-2">
        <img src={post.avatar} alt={post.userName} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="font-semibold">{post.userName}</p>
          <p className="text-xs text-gray-500">{post.time}</p>
        </div>
      </div>

      <p className="mb-3 text-gray-800 dark:text-gray-100">{post.content}</p>

      {post.audio && <audio controls src={post.audio} className="w-full mb-3 rounded-md" />}

      <div className="flex flex-wrap items-center gap-3 text-sm mt-2">
        <button onClick={() => handleReact('like')} className="hover:scale-105">👍 {reactions.like}</button>
        <button onClick={() => handleReact('love')} className="hover:scale-105">❤️ {reactions.love}</button>
        <button onClick={() => handleReact('laugh')} className="hover:scale-105">😂 {reactions.laugh}</button>
        <button onClick={() => handleReact('wow')} className="hover:scale-105">😮 {reactions.wow}</button>
        <button onClick={togglePin} className="text-blue-500 hover:underline ml-auto">
          {isPinned ? 'Unpin' : '📌 Pin'}
        </button>
      </div>

      <div className="text-xs text-gray-400 mt-2">
        👁 {post.views || 0} views • ❤️ {Object.values(reactions).reduce((a, b) => a + b)} reactions
      </div>

      <div className="text-xs text-blue-600 mt-1">
        {post.earnings ? post.earnings.toFixed(2) : '0.00'} CYBV
      </div>
    </div>
  );
}