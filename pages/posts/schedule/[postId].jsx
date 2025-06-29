import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function PostSchedule() {
  const router = useRouter();
  const { postId } = router.query;
  const [scheduledTime, setScheduledTime] = useState('');
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (postId) {
      fetch(`/api/posts/schedule/${postId}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data.post);
          setScheduledTime(data.post.scheduledTime);
        })
        .catch(() => setPost(null));
    }
  }, [postId]);

  const handleSchedulePost = async () => {
    await fetch(`/api/posts/schedule/${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scheduledTime }),
    });

    alert('Post scheduled successfully!');
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Schedule Post</h2>
      <div className="mb-6">
        <label htmlFor="scheduledTime" className="block text-xl font-semibold">Scheduled Time</label>
        <input
          type="datetime-local"
          id="scheduledTime"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          className="p-2 mt-2 border rounded-lg"
        />
      </div>
      <button onClick={handleSchedulePost} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
        Schedule Post
      </button>
    </div>
  );
}
