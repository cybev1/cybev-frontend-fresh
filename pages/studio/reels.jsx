
import React from 'react';
import dynamic from 'next/dynamic';

const ReelsExploreComponent = dynamic(() => import('../../components/ReelsExploreComponent'), {
  ssr: false,
});

export default function ReelsStudioPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Reels</h1>
      <ReelsExploreComponent />
    </main>
  );
}
