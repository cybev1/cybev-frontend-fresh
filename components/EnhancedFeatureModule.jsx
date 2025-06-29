
import React from 'react';

export default function EnhancedFeatureModule() {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white p-6 rounded-2xl shadow-2xl max-w-md mx-auto mt-12 animate-fade-in">
      <h2 className="text-2xl font-extrabold mb-4">🎯 CYBEV Engagement Insights</h2>
      <p className="text-sm mb-4">
        Get real-time insights on your Reels, Stories, and Timeline posts. Know what’s trending, what’s earning, and what’s next.
      </p>
      <button className="bg-white text-purple-700 font-bold py-2 px-4 rounded-full hover:bg-gray-100 transition">
        View Dashboard
      </button>
    </div>
  );
}
