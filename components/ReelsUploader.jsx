import { useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default function ReelsUploader() {
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) return;

    const formData = new FormData();
    formData.append('video', video);
    formData.append('caption', caption);

    try {
      setUploading(true);
      const res = await axios.post('/api/reels/upload', formData);
      router.push('/reels/' + res.data.id);
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center">Upload Reel</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} required />
      <textarea
        placeholder="Write a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {uploading ? 'Uploading...' : 'Upload Reel'}
      </button>
    </form>
  );
}