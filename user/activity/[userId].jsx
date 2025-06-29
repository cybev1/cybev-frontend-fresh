import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UserActivity() {
  const router = useRouter();
  const { userId } = router.query;
  const [activity, setActivity] = useState({ posts: [], reactions: [], comments: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetch(`/api/user/activity/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setActivity(data);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">User Activity Feed</h2>

      <h3 className="text-xl font-semibold">Posts</h3>
      <div className="space-y-4">
        {activity.posts.map((post) => (
          <div key={post._id} className="p-4 bg-gray-200 rounded-lg">
            <h4 className="font-semibold">{post.title}</h4>
            <p>{post.content}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-6">Reactions</h3>
      <div className="space-y-4">
        {activity.reactions.map((reaction, index) => (
          <div key={index} className="p-4 bg-blue-200 rounded-lg">
            <span>{reaction.emoji} on post {reaction.postId}</span>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-6">Comments</h3>
      <div className="space-y-4">
        {activity.comments.map((comment, index) => (
          <div key={index} className="p-4 bg-green-200 rounded-lg">
            <p>{comment.text} on post {comment.postId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
