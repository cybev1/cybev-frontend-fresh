import React from 'react';

export default function ReelsExplore() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Explore Reels</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="aspect-w-9 aspect-h-16 bg-black rounded-lg overflow-hidden shadow-md">
            <video className="w-full h-full object-cover" controls>
              <source src={`/videos/sample${(i % 3) + 1}.mp4`} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
    </div>
  );
}