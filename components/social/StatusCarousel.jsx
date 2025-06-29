import { useRef } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function StatusCarousel() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const demoStories = [
    {
      username: 'prince',
      mediaURL: '/avatars/prince.png',
      caption: 'Building CYBEV 🔥'
    },
    {
      username: 'jane',
      mediaURL: '/avatars/queen.png',
      caption: 'New updates coming!'
    },
    {
      username: 'coach',
      mediaURL: '/avatars/coach.png',
      caption: 'Go live soon!'
    },
    {
      username: 'sarah',
      mediaURL: '/avatars/default.png',
      caption: 'Just joined the community'
    }
  ];

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('media', file);
    formData.append('username', localStorage.getItem('cybev_username') || 'guest');
    formData.append('caption', '');

    try {
      const res = await fetch('/api/stories/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success('📤 Story uploaded!');
        router.reload();
      } else {
        toast.error('Upload failed');
      }
    } catch (err) {
      toast.error('Server error');
    }
  };

  return (
    <div className="flex overflow-x-auto space-x-4 py-4 mb-6 px-1">
      <div
        onClick={handleUploadClick}
        className="w-36 min-w-[144px] h-60 bg-gray-200 dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer border-2 border-dashed border-blue-400"
      >
        <div className="text-4xl text-blue-600 font-bold mb-2">+</div>
        <p className="text-sm text-blue-600">Add Story</p>
        <input
          type="file"
          accept="image/*,video/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {demoStories.map((story, i) => (
        <div
          key={i}
          onClick={() => router.push('/stories/' + story.username)}
          className="w-36 min-w-[144px] h-60 rounded-xl overflow-hidden shadow-md cursor-pointer relative bg-black"
        >
          <img
            src={story.mediaURL}
            alt={story.username}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-transparent to-transparent text-white text-xs">
            <p className="font-semibold truncate">{story.username}</p>
            {story.caption && <p className="text-xs truncate">{story.caption}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}