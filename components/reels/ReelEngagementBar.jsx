
import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

export default function ReelEngagementBar({ likes = 123, comments = 45, shares = 12 }) {
  return (
    <div className="flex items-center justify-around w-full text-white py-3 border-t border-gray-700">
      <div className="flex items-center space-x-2">
        <Heart className="w-5 h-5" />
        <span>{likes}</span>
      </div>
      <div className="flex items-center space-x-2">
        <MessageCircle className="w-5 h-5" />
        <span>{comments}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Share2 className="w-5 h-5" />
        <span>{shares}</span>
      </div>
    </div>
  );
}
