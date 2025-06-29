
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function ReelViewer() {
  const router = useRouter();
  const { id } = router.query;
  const [reels, setReels] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchReels = async () => {
      const res = await axios.get('/api/reels');
      setReels(res.data || []);
    };
    fetchReels();
  }, []);

  const currentIndex = reels.findIndex(reel => reel._id === id);
  const currentReel = reels[currentIndex];

  const navigate = (direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < reels.length) {
      router.push(`/reels/${reels[newIndex]._id}`);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  }, [id]);

  if (!currentReel) return <div className="text-center mt-20">Loading Reel...</div>;

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center relative">
      <video
        ref={videoRef}
        src={currentReel.videoUrl}
        controls
        autoPlay
        loop
        className="max-h-full max-w-full"
      />
      <div className="absolute top-4 left-4">
        <button onClick={() => router.back()} className="bg-white text-black px-3 py-1 rounded">Back</button>
      </div>
      <div className="absolute bottom-10 flex justify-between w-full px-6">
        <button onClick={() => navigate(-1)} className="text-2xl">⬅️</button>
        <button onClick={() => navigate(1)} className="text-2xl">➡️</button>
      </div>
    </div>
  );
}
