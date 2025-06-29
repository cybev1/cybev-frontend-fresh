import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PostDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [reactions, setReactions] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setPost(data.post));

      fetch(`/api/reactions/${id}`)
        .then((res) => res.json())
        .then((data) => setReactions(data.reactions));
    }
  }, [id]);

  const handleReaction = async (emoji) => {
    const userId = 'user-id-placeholder'; // Replace with dynamic user ID fetching logic
    await fetch(`/api/reactions/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, emoji }),
    });

    setSelectedEmoji(emoji);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p>{post.content}</p>

      <div className="mt-4">
        <h3 className="text-lg">Reactions:</h3>
        <div className="flex space-x-4 mt-2">
          {['❤️', '👍', '😍', '😂', '😢'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              className={`text-2xl ${selectedEmoji === emoji ? 'text-blue-500' : 'text-gray-500'}`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <h4 className="text-sm">Reactions Count:</h4>
          {reactions.map((reaction) => (
            <div key={reaction._id} className="flex items-center space-x-2">
              <span className="text-xl">{reaction._id}</span>
              <span className="text-gray-600">({reaction.count})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
