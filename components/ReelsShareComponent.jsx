
import { useRouter } from 'next/router';
import { Share2 } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ReelsShareComponent({ reelId }) {
  const router = useRouter();

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/studio/reels-viewer?id=${reelId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success("Reel link copied to clipboard!");
    });
  };

  return (
    <button
      onClick={handleShare}
      className="mt-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all"
    >
      <Share2 size={18} className="mr-2" /> Share
    </button>
  );
}
