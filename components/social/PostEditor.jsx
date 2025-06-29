import { useState, useEffect } from 'react';
import { MapPinIcon, VideoCameraIcon, PhotoIcon, MusicalNoteIcon, FaceSmileIcon, SparklesIcon, UserPlusIcon } from '@heroicons/react/24/solid';

const emojiList = ['😀', '😂', '😍', '🔥', '💡', '🎯', '🙏', '😎'];

function highlightTags(text) {
  const mentionPattern = /(@\w+)/g;
  const hashtagPattern = /(#[\w]+)/g;

  return text
    .replace(mentionPattern, '<span class="text-blue-500 font-semibold">$1</span>')
    .replace(hashtagPattern, '<span class="text-purple-500 font-semibold">$1</span>');
}

export default function PostEditor({ onSubmit }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [location, setLocation] = useState('');
  const [tagged, setTagged] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cybev_draft_post');
    if (saved) setContent(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('cybev_draft_post', content);
  }, [content]);

  const handleFile = (e, type) => {
    const file = e.target.files[0];
    if (type === 'image') setImage(file);
    if (type === 'video') setVideo(file);
    if (type === 'audio') setAudio(file);
  };

  const handleEmoji = (emoji) => setContent(prev => prev + emoji);

  const generateAIContent = async () => {
    const mock = "Here's an AI-generated tip: Stay consistent, stay visible. 🚀 #Growth";
    setContent(prev => prev + (prev ? '\n\n' : '') + mock);
  };

  const handleSubmit = () => {
    onSubmit({ content, image, video, audio, location, tagged });
    localStorage.removeItem('cybev_draft_post');
    setContent('');
    setImage(null);
    setVideo(null);
    setAudio(null);
    setLocation('');
    setTagged('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-4">
      <div className="relative">
        <textarea
          className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white bg-transparent relative z-10"
          rows={4}
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div
          className="absolute inset-0 p-3 pointer-events-none whitespace-pre-wrap break-words text-transparent dark:text-transparent"
          dangerouslySetInnerHTML={{ __html: highlightTags(content) }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
        <label className="flex items-center gap-1 cursor-pointer">
          <PhotoIcon className="w-4 h-4 text-blue-500" />
          <span>Image</span>
          <input type="file" hidden accept="image/*" onChange={(e) => handleFile(e, 'image')} />
        </label>
        <label className="flex items-center gap-1 cursor-pointer">
          <VideoCameraIcon className="w-4 h-4 text-purple-500" />
          <span>Video</span>
          <input type="file" hidden accept="video/*" onChange={(e) => handleFile(e, 'video')} />
        </label>
        <label className="flex items-center gap-1 cursor-pointer">
          <MusicalNoteIcon className="w-4 h-4 text-green-500" />
          <span>Audio</span>
          <input type="file" hidden accept="audio/*" onChange={(e) => handleFile(e, 'audio')} />
        </label>
        <div className="flex items-center gap-1">
          <MapPinIcon className="w-4 h-4 text-red-500" />
          <input
            type="text"
            className="border px-2 py-1 rounded text-xs dark:bg-gray-700 dark:text-white"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button onClick={() => setShowEmoji(!showEmoji)} className="text-xs flex items-center gap-1">
          <FaceSmileIcon className="w-4 h-4 text-yellow-400" /> Emoji
        </button>
        <button onClick={generateAIContent} className="text-xs flex items-center gap-1">
          <SparklesIcon className="w-4 h-4 text-indigo-400" /> AI Generate
        </button>
      </div>

      {showEmoji && (
        <div className="flex flex-wrap gap-2 mt-2 border rounded p-2 bg-gray-50 dark:bg-gray-700 text-lg">
          {emojiList.map((emoji, i) => (
            <button key={i} onClick={() => handleEmoji(emoji)} className="hover:scale-110">{emoji}</button>
          ))}
        </div>
      )}

      <div className="mt-3 space-y-2">
        {image && <img src={URL.createObjectURL(image)} alt="preview" className="max-w-full rounded" />}
        {video && <video controls src={URL.createObjectURL(video)} className="w-full rounded" />}
        {audio && <audio controls src={URL.createObjectURL(audio)} className="w-full" />}
        {location && <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">📍 {location}</div>}
      </div>

      <div className="mt-4">
        <label className="text-sm flex items-center gap-1 mb-1">
          <UserPlusIcon className="w-4 h-4 text-pink-500" />
          Tag Friends
        </label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white text-sm"
          placeholder="e.g. @jane, @alex"
          value={tagged}
          onChange={(e) => setTagged(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        Post
      </button>
    </div>
  );
}