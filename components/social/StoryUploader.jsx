import { useState } from 'react';
import { toast } from 'react-toastify';

export default function StoryUploader() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return toast.error("Select a file first.");
    setLoading(true);

    const formData = new FormData();
    formData.append('media', file);
    formData.append('caption', caption);
    formData.append('username', localStorage.getItem('cybev_username') || 'guest');

    try {
      const res = await fetch('/api/stories/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success('📤 Story uploaded!');
        setFile(null);
        setCaption('');
      } else {
        toast.error('Upload failed.');
      }
    } catch (err) {
      toast.error('Upload error.');
    }

    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 mb-6">
      <h3 className="text-sm font-semibold mb-3">📤 Upload a Story</h3>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3 block w-full text-sm"
      />
      <textarea
        className="w-full p-2 mb-3 rounded border dark:bg-gray-800"
        placeholder="Write a caption (optional)..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Uploading...' : 'Upload Story'}
      </button>
    </div>
  );
}