import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import StoryViewer from '@/components/social/StoryViewer';

export default function UserStories() {
  const router = useRouter();
  const { username } = router.query;
  const [stories, setStories] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (username) {
      fetch('/api/stories?user=' + username)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.stories) {
            setStories(data.stories);
          }
          setLoaded(true);
        });
    }
  }, [username]);

  if (!loaded) return <p className="p-4">Loading stories...</p>;
  if (loaded && stories.length === 0) return <p className="p-4">No stories from @{username}.</p>;

  return (
    <StoryViewer
      stories={stories.map(s => ({
        username: s.username,
        image: s.mediaURL,
        text: s.caption
      }))}
      onClose={() => router.push('/feed')}
    />
  );
}