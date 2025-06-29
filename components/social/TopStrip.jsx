import React from 'react';
import Link from 'next/link';

const mockFrames = [
  { type: 'status', label: '➕', username: 'You', isUpload: true },
  { type: 'reel', label: '🎥', username: 'Prince Dike', reelId: 'r1', avatar: '/avatars/p1.jpg' },
  { type: 'story', label: '📸', username: 'Jane', storyUser: 'jane', avatar: '/avatars/p2.jpg' },
  { type: 'story', label: '🔴', username: 'Alex (Live)', storyUser: 'alex', avatar: '/avatars/p3.jpg', isLive: true },
];

export default function TopStrip() {
  return (
    <div className="flex space-x-4 overflow-x-auto py-3 px-3 bg-white dark:bg-gray-900 rounded-lg shadow mb-4">
      {mockFrames.map((item, i) => (
        <div key={i} className="flex-shrink-0 w-24 text-center">
          {item.isUpload ? (
            <button className="w-full h-28 flex flex-col items-center justify-center border-2 border-dashed rounded-xl text-gray-500 hover:border-blue-600 hover:text-blue-600">
              <span className="text-3xl">➕</span>
              <span className="text-xs mt-1">Your Status</span>
            </button>
          ) : (
            <Link href={item.type === 'reel' ? `/reels/${item.reelId}` : `/stories/${item.storyUser}`}>
              <div className="w-full h-28 flex flex-col items-center justify-center cursor-pointer border-2 border-blue-500 rounded-xl overflow-hidden">
                <img src={item.avatar} alt={item.username} className="object-cover w-full h-20 rounded-t-xl" />
                <span className="text-xs mt-1">{item.label} {item.username}</span>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}