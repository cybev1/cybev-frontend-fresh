
import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function ReelsExploreComponent() {
  const [video, setVideo] = useState(null);

  const handleUpload = async () => {
    if (!video) return;
    const formData = new FormData();
    formData.append('video', video);
    formData.append('uuid', uuidv4());

    try {
      const res = await axios.post('/api/reels/upload', formData);
      alert('Reel uploaded!');
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  return (
    <div className="p-4">
      <input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
      <button onClick={handleUpload} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Upload Reel</button>
    </div>
  );
}
