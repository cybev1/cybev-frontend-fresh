
import React, { useState } from 'react';
import { Camera, Wand2, Rocket, PiggyBank, Share2, Video, Coins } from 'lucide-react';
import axios from 'axios';

export default function PostComposer({ onPost }) {
  const [text, setText] = useState('');
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePost = () => {
    if (!text.trim()) return;
    const postData = { text, media };
    onPost(postData);
    setText('');
    setMedia(null);
  };

  const handleGenerateAI = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/generate-post', { prompt: 'Generate a creative post' });
      setText(res.data.generatedText);
    } catch (err) {
      console.error('AI Generation Failed', err);
    } finally {
      setLoading(false);
    }
  };

  const triggerMediaUpload = () => {
    document.getElementById('mediaUpload').click();
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-md mb-4 space-y-3">
      <textarea
        className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-sm text-gray-800 dark:text-white"
        rows={4}
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        id="mediaUpload"
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setMedia(e.target.files[0])}
        className="hidden"
      />
      <div className="flex flex-wrap items-center justify-start gap-4 text-sm text-gray-700 dark:text-gray-300 pt-2 border-t border-gray-200 dark:border-gray-700">
        <button className="flex items-center gap-1 hover:text-blue-600" onClick={triggerMediaUpload}>
          <Camera className="w-4 h-4" /> <span>Media</span>
        </button>
        <button className="flex items-center gap-1 hover:text-purple-600" onClick={handleGenerateAI} disabled={loading}>
          <Wand2 className="w-4 h-4" /> <span>{loading ? 'Generating...' : 'AI Generate'}</span>
        </button>
        <button className="flex items-center gap-1 hover:text-yellow-600">
          <Coins className="w-4 h-4" /> <span>Mint</span>
        </button>
        <button className="flex items-center gap-1 hover:text-green-600">
          <PiggyBank className="w-4 h-4" /> <span>Stake</span>
        </button>
        <button className="flex items-center gap-1 hover:text-red-600">
          <Rocket className="w-4 h-4" /> <span>Boost</span>
        </button>
        <button className="flex items-center gap-1 hover:text-indigo-600">
          <Share2 className="w-4 h-4" /> <span>Share</span>
        </button>
        <button className="flex items-center gap-1 hover:text-pink-600">
          <Video className="w-4 h-4" /> <span>Go Live</span>
        </button>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-full"
          onClick={handlePost}
        >
          Post
        </button>
      </div>
    </div>
  );
}
