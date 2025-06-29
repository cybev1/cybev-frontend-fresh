import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Heart, Share2, Star } from 'lucide-react';

export default function ReelsViewerEnhanced({ reels = [] }) {
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef([]);

  const handleScroll = (e) => {
    const index = Math.round(window.scrollY / window.innerHeight);
    setCurrent(index);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === current) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [current]);

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {reels.map((reel, index) => (
        <div key={reel._id} className="relative snap-start h-screen w-full">
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={reel.videoUrl}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            controls={false}
          />
          <div className="absolute bottom-10 right-5 flex flex-col items-center space-y-4 text-white">
            <button><Heart /></button>
            <button><Share2 /></button>
            <button><Star /></button>
          </div>
        </div>
      ))}
    </div>
  );
}
