import React, { useEffect, useState } from 'react';
import PostCard from '@/components/social/PostCard';
import CyBevBotWidget from '@/components/social/CyBevBotWidget';
import LiveNowStrip from '@/components/social/LiveNowStrip';
import PostComposer from '@/components/social/PostComposer';
import SuperBloggerCard from '@/components/social/SuperBloggerCard';
import SuggestedFollowers from '@/components/social/SuggestedFollowers';
import SponsoredAd from '@/components/social/SponsoredAd';
import StatusCarousel from '@/components/social/StatusCarousel';
import TopStrip from '@/components/social/TopStrip';

export default function Feed() {
  const [orderedPosts, setOrderedPosts] = useState([]);

  useEffect(() => {
    const dummyPosts = [
      {
        id: 1,
        userName: 'Prince Dike',
        avatar: '/default-avatar.png',
        time: '2 hrs ago',
        content: 'This is a test post with token buttons!',
        likes: 4,
      },
      {
        id: 2,
        userName: 'Jane Doe',
        avatar: '/default-avatar.png',
        time: '5 hrs ago',
        content: 'Another amazing post with emojis 💥🔥',
        likes: 2,
      },
      {
        id: 3,
        userName: 'Alex Smith',
        avatar: '/default-avatar.png',
        time: '1 day ago',
        content: 'Exploring the future of Web3 and social platforms!',
        likes: 7,
      },
      {
        id: 4,
        userName: 'Rachel Green',
        avatar: '/default-avatar.png',
        time: '3 days ago',
        content: 'Check out my latest video on staking!',
        likes: 5,
      },
    ];

    const pinnedId = localStorage.getItem('cybev_pinned_post');
    if (pinnedId) {
      const pinned = dummyPosts.find(p => String(p.id) === pinnedId);
      const rest = dummyPosts.filter(p => String(p.id) !== pinnedId);
      setOrderedPosts([pinned, ...rest]);
    } else {
      setOrderedPosts(dummyPosts);
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 px-4">
      <div className="lg:w-2/3 mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">🚀 CYBEV Feed Demo</h1>
        <TopStrip />
        <LiveNowStrip />
        <PostComposer />
        <SuperBloggerCard />

        {orderedPosts.map((post, index) => (
          <React.Fragment key={post.id}>
            <PostCard post={post} />
            {(index + 1) % 3 === 0 && <SponsoredAd />}
          </React.Fragment>
        ))}

        <SuggestedFollowers />
        <CyBevBotWidget />
      </div>
    </div>
  );
}