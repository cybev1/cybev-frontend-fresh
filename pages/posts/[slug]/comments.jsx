import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PostComments() {
  const router = useRouter();
  const { slug } = router.query; // Use 'slug' for identifying the post
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (slug) {
      fetch(`/api/comments/${slug}`)
        .then((res) => res.json())
        .then((data) => setComments(data.comments))
        .catch(() => setComments([]));
    }
  }, [slug]);

  const handleCommentSubmit = async () => {
    const userId = 'user-id-placeholder'; // Replace with actual user ID
    await fetch(`/api/comments/${slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, text: newComment }),
    });

    setComments([...comments, { userId, text: newComment, createdAt: new Date(), likes: 0 }]);
    setNewComment('');
  };

  const handleLike = async (commentId) => {
    await fetch(`/api/comments/${slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId }),
    });

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Comments</h2>
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment._id} className="p-4 bg-gray-200 rounded-lg">
            <p>{comment.text}</p>
            <div className="flex items-center">
              <button
                onClick={() => handleLike(comment._id)}
                className="text-blue-600"
              >
                Like ({comment.likes})
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label htmlFor="newComment" className="block text-xl font-semibold">Add a Comment</label>
        <textarea
          id="newComment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 mt-2 border rounded-lg"
          placeholder="Write your comment here..."
        />
      </div>

      <button onClick={handleCommentSubmit} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
        Post Comment
      </button>
    </div>
  );
}
