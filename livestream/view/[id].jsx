import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function LivestreamViewer() {
  const router = useRouter();
  const { id } = router.query;
  const [livestream, setLivestream] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/livestream/${id}`)
        .then((res) => res.json())
        .then((data) => setLivestream(data.livestream))
        .catch(() => {
          setLivestream(null);
        });
    }
  }, [id]);

  if (!livestream) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">{livestream.title}</h2>
      <div className="mt-4">
        <video controls autoPlay loop className="max-w-full rounded-lg">
          <source src={livestream.streamUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="mt-4">
        <p>🎥 Streaming by: {livestream.user}</p>
        <p>👁️ Viewers: {livestream.viewers}</p>
      </div>
    </div>
  );
}
