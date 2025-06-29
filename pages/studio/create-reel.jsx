
import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import axios from 'axios';

export default function CreateReel() {
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!video || !caption) return alert('Please add a video and caption.');
    console.log('Uploading reel...', { video, caption });
    // Implement actual upload logic here
  };

  const handleGenerateAI = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/generate-post', { prompt: 'Generate a creative short video caption' });
      setCaption(res.data.generatedText);
    } catch (err) {
      console.error('AI error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md space-y-5">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">🎬 Upload Reel</h1>

      <input
        type="file"
        accept="video/mp4"
        onChange={(e) => setVideo(e.target.files[0])}
        className="block w-full text-sm text-gray-700 dark:text-gray-300"
      />

      {video && (
        <video
          src={URL.createObjectURL(video)}
          controls
          className="w-full rounded-lg mt-3 max-h-[400px]"
        />
      )}

      <textarea
        rows={3}
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white"
      />

      <div className="flex items-center justify-between">
        <button
          onClick={handleGenerateAI}
          className="text-sm flex items-center gap-1 text-blue-600 hover:underline"
          disabled={loading}
        >
          <Wand2 className="w-4 h-4" />
          {loading ? 'Generating...' : 'AI Generate'}
        </button>
        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-full"
        >
          Publish Reel
        </button>
      </div>
    </div>
  );
}
